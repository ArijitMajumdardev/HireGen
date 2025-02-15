import { Context } from "hono";
import { getPrisma } from "../../prisma/PrismaClient";
import { HTTPException } from "hono/http-exception";
import defaultData from "../defaultData";

const handleCreateResume = async (c: Context): Promise<any> => {
    try {
        const prisma = getPrisma(c.env.DATABASE_URL);
        const { uuid, resumeTitle,email } = await c.req.json();
        console.log(resumeTitle);
        const data = {
            id: uuid,
            resumeTitle,
            userEmail: email,
            address: defaultData.address,
            email: defaultData.email,
            
            
        }
        await prisma.resume.create({
            data:{id:uuid,resumeTitle,userEmail:email}
        })
        
        c.status(200);
        return c.json({ message: "Resume SuccessFull Created" });
    } catch (error) { 
        c.status(400);
        return c.json({message : error})
    }
};


const GetResumeList = async (c: Context): Promise<any> => {
    try {
        const prisma = getPrisma(c.env.DATABASE_URL);
        const { email } = c.get("user")
        const response = await prisma.resume.findMany({
            where: {
                userEmail:email
            }
        })

        console.log(response);

        return c.json(response)
    } catch (error) {
        c.status(404)
        throw new HTTPException(404,{message:"Internal Server Error"})
    }
}


const updateResume = async(c :Context):Promise<any> => {
    try {
        
    } catch (error) {
        
    }
}


export { handleCreateResume,GetResumeList,updateResume };
