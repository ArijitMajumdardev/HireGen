import { Context } from "hono";
import { getPrisma } from "../../prisma/PrismaClient";
import { HTTPException } from "hono/http-exception";
import { generateText } from "ai";
import { createGoogleGenerativeAI, google } from "@ai-sdk/google";

const handle_interview_generate = async (c: Context): Promise<any> => {
  try {
    const google = createGoogleGenerativeAI({
      apiKey: c.env.GOOGLE_GENERATIVE_AI_API_KEY,
    });
    const prisma = getPrisma(c.env.DATABASE_URL);
    const { type, role, level, techstack, amount, userid } = await c.req.json();

    const { text: questions } = await generateText({
      model: google("gemini-2.0-flash-001"),
      prompt: `Prepare questions for a job interview.
          The job role is ${role}.
          The job experience level is ${level}.
          The tech stack used in the job is: ${techstack}.
          The focus between behavioural and technical questions should lean towards: ${type}.
          The amount of questions required is: ${amount}.
          Please return only the questions, without any additional text.
          The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
          Return the questions formatted like this:
          ["Question 1", "Question 2", "Question 3"]
          
          Thank you! <3
      `,
    });

    const interview = {
      role,
      type,
      level,
      techstack: techstack.split(","),
      questions: JSON.parse(questions),
      userid: userid,
      finalized: true,
    };

    await prisma.interview.create({
      data: interview,
    });

    c.status(200);
    return c.json({ message: "Interview Created Successfully " });
  } catch (error) {
    c.status(500);
    console.log(error);
    throw new HTTPException(500, { message: error as string });
  }
};

//Get all user Interviews

const Get_User_Interviews = async (c: Context): Promise<any> => {
  try {
    const prisma = getPrisma(c.env.DATABASE_URL);
    const userid = c.req.param("userid");

    const response = await prisma.interview.findMany({
      where: {
        userid: userid,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    c.status(200);
    return c.json(response);
  } catch (error) {
    c.status(404);
    throw new HTTPException(404, { message: "Internal Server Error" });
  }
};
//Get Interview

const Get_Interview = async (c: Context): Promise<any> => {
  try {
    const prisma = getPrisma(c.env.DATABASE_URL);
    const interviewId = c.req.param("id");

    const response = await prisma.interview.findUnique({
      where: {
        id: interviewId,
      },
    });

    c.status(200);
    return c.json(response);
  } catch (error) {
    c.status(404);
    throw new HTTPException(404, { message: "Internal Server Error" });
  }
};

export { handle_interview_generate, Get_User_Interviews,Get_Interview };
