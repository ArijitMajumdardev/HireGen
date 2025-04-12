import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/context/AuthProvider";
import API from "@/lib/ServerAPI";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const InterviewFeedback = () => {
  const param = useParams();
  const interviewId = param.interviewId;
  const { user } = useAuthContext();
  const [feedback, setFeedback] = useState<Feedback>()
  const [interview, setInterview] = useState<Interview>()
  const [loading, setLoading] = useState(true)
  const [errorResponse, setErrorResponse] = useState("")

  useEffect(() => {
    if (!user?.id) return;
    const getFeedback = async () => {
      try {
        const response = await API.get(`/interview/feedback?interviewId=${interviewId}&userId=${user.id}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log(response)
        const {interview,...feedback} = response.data
        setFeedback(feedback)
        setInterview(interview)
      } catch (error: any) {
        console.log(error);
        if (error.response?.status === 401) {
          window.location.href = "/"; // Redirect to login/home
        }
        setErrorResponse(error.response?.data)
        // toast.error(error.response?.data || "Something went wrong");
      }
      setLoading(false)
    };

    getFeedback();
  }, [user]);

  if (loading) {
    return (
      <section className="section-feedback bg-[#0a0b10] text-white h-screen flex items-center justify-center">
        <p className="text-lg animate-pulse">Loading feedback...</p>
      </section>
    );
  }
  
  if (errorResponse) {
    return (
      <section className="section-feedback bg-[#0a0b10] text-white h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Oops! Something went wrong</h2>
          <p className="text-red-400">{errorResponse}</p>
          <Link to="/interview/dashboard">
            <Button className="mt-6 btn-secondary text-sm font-semibold text-primary-200">
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </section>
    );
  }
  return  <section className="section-feedback bg-[#0a0b10] text-white">
  <div className="flex flex-row justify-center">
    <h1 className="text-4xl font-semibold">
      Feedback on the Interview -{" "}
      <span className="capitalize">{interview?.role}</span> Interview
    </h1>
  </div>

  <div className="flex flex-row justify-center ">
    <div className="flex flex-row gap-5">
      {/* Overall Impression */}
      <div className="flex flex-row gap-2 items-center">
        <img src="/star.svg" width={22} height={22} alt="star" />
        <p>
          Overall Impression:{" "}
          <span className="text-primary-200 font-bold">
            {feedback?.totalScore}
          </span>
          /100
        </p>
      </div>

      {/* Date */}
      <div className="flex flex-row gap-2">
        <img src="/calendar.svg" width={22} height={22} alt="calendar" />
        <p>
          {feedback?.createdAt
            ? dayjs(feedback.createdAt).format("MMM D, YYYY h:mm A")
            : "N/A"}
        </p>
      </div>
    </div>
  </div>

  <hr />

  <p>{feedback?.finalAssessment}</p>

  {/* Interview Breakdown */}
  <div className="flex flex-col gap-4">
    <h2>Breakdown of the Interview:</h2>
    {feedback?.categoryScores?.map((category, index) => (
      <div key={index}>
        <p className="font-bold">
          {index + 1}. {category.name} ({category.score}/100)
        </p>
        <p>{category.comment}</p>
      </div>
    ))}
  </div>

  <div className="flex flex-col gap-3">
    <h3>Strengths</h3>
    <ul>
      {feedback?.strengths?.map((strength, index) => (
        <li key={index}>{strength}</li>
      ))}
    </ul>
  </div>

  <div className="flex flex-col gap-3">
    <h3>Areas for Improvement</h3>
    <ul>
      {feedback?.areasForImprovement?.map((area, index) => (
        <li key={index}>{area}</li>
      ))}
    </ul>
  </div>

  <div className="buttons">
        <Link to={"/interview/dashboard"} className="flex w-full justify-center">
    <Button className="btn-secondary flex-1 text-sm font-semibold text-primary-200 text-center">
          Back to dashboard
    </Button>
      </Link>

      <Link
        to={`/interview/${interviewId}`}
        className="flex w-full justify-center"
      >
    <Button className="btn-primary flex-1 text-sm font-semibold text-white text-center">
          Retake Interview
    </Button>
      </Link>
  </div>
</section>;
};

export default InterviewFeedback;
