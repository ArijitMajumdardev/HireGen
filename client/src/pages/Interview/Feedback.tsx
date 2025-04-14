import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/context/AuthProvider";
import API from "@/lib/ServerAPI";
import dayjs from "dayjs";
import { CalendarDays, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const InterviewFeedback = () => {
  const param = useParams();
  const interviewId = param.interviewId;
  const { user } = useAuthContext();

  const [feedback, setFeedback] = useState<Feedback>();
  const [interview, setInterview] = useState<Interview>();
  const [loading, setLoading] = useState(true);
  const [errorResponse, setErrorResponse] = useState("");

  useEffect(() => {
    if (!user?.id) return;

    const getFeedback = async () => {
      try {
        const response = await API.get(
          `/interview/feedback?interviewId=${interviewId}&userId=${user.id}`
        );

        const { interview, ...feedback } = response.data;
        setFeedback(feedback);
        setInterview(interview);
      } catch (error: any) {
        if (error.response?.status === 401) {
          window.location.href = "/";
        }
        setErrorResponse(error.response?.data || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    getFeedback();
  }, [user]);

  if (loading) {
    return (
      <section className="bg-[#0a0b10] text-white h-screen flex items-center justify-center">
        <p className="text-lg animate-pulse">Loading feedback...</p>
      </section>
    );
  }

  if (errorResponse) {
    return (
      <section className="bg-[#0a0b10] text-white h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-semibold">Oops! Something went wrong</h2>
          <p className="text-red-400">{errorResponse}</p>
          <Link to="/interview/dashboard">
            <Button className="mt-4 bg-primary-1 text-white rounded px-6 py-2">
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#0a0b10] text-white min-h-screen px-6 md:px-20 py-10 space-y-10 max-w-[1200px] mx-auto">
      <div className="text-center space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold">
          Feedback on the <span className="capitalize">{interview?.role}</span> Interview
        </h1>
        <div className="flex justify-center gap-6 text-sm text-gray-300 mt-2">
          <div className="flex items-center gap-2">
            <Star className="text-yellow-400 size-5" />
            <span>
              Overall Score:{" "}
              <span className="text-white font-semibold">{feedback?.totalScore}/100</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarDays className="text-blue-400 size-5" />
            <span>
              {feedback?.createdAt
                ? dayjs(feedback.createdAt).format("MMM D, YYYY h:mm A")
                : "N/A"}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-[#1b1d29] p-6 rounded-xl shadow space-y-4">
        <h2 className="text-xl font-semibold text-primary-1">Final Assessment</h2>
        <p className="text-gray-300 leading-relaxed">{feedback?.finalAssessment}</p>
      </div>

      {/* Breakdown */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-primary-1">Interview Breakdown</h2>
        {feedback?.categoryScores?.map((category, index) => (
          <div key={index} className="bg-[#1f2230] p-4 rounded-lg">
            <p className="font-bold text-white">
              {index + 1}. {category.name} — <span className="text-primary-1">{category.score}/100</span>
            </p>
            <p className="text-gray-300 mt-1">{category.comment}</p>
          </div>
        ))}
      </div>

      {/* Strengths */}
      {feedback?.strengths?.length ? (
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-green-400">Strengths</h3>
          <ul className="list-disc list-inside text-gray-300 space-y-1">
            {feedback.strengths.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {/* Areas for Improvement */}
      {feedback?.areasForImprovement?.length ? (
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-red-400">Areas for Improvement</h3>
          <ul className="list-disc list-inside text-gray-300 space-y-1">
            {feedback.areasForImprovement.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="flex flex-col md:flex-row gap-4 mt-10">
        <Link to="/interview/dashboard" className="w-full md:w-1/2">
          <Button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-xl">
            Back to Dashboard
          </Button>
        </Link>
        <Link to={`/interview/${interviewId}`} className="w-full md:w-1/2">
          <Button className="w-full bg-primary-1 hover:bg-primary-1/80 text-white py-3 rounded-xl">
            Retake Interview
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default InterviewFeedback;
