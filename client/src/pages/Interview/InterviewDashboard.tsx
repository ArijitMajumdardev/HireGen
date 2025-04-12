import InterviewCard from "@/components/custom/InterviewCard";
import { useAuthContext } from "@/context/AuthProvider";
import API from "@/lib/ServerAPI";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const InterviewDashboard = () => {
  const { user } = useAuthContext();
  const [interviewList, setInterviewList] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;

    const getInterviews = async () => {
      try {
        const response = await API.get("/get-user-interviews/" + user?.id, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        setInterviewList(response.data);
      } catch (error: any) {
        console.log(error);
        if (error.response?.status === 401) {
          window.location.href = "/";
        }
        toast.error(error.response?.data || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    getInterviews();
  }, [user]);

  const renderSkeletons = () => {
    return Array.from({ length: 3 }).map((_, index) => (
      <div
        key={index}
        className="animate-pulse bg-[#272533] rounded-xl h-[420px] w-full"
      ></div>
    ));
  };

  return (
    <div className="min-h-screen bg-[#05021E] px-6 py-10">
      <div className="flex flex-col h-28 md:h-14 md:flex-row items-center justify-between mb-8 ">
        <h1 className="font-bold text-white text-4xl">Your Interviews</h1>
        <Link to="/interview/generate">
          <Button className="bg-primary-1 text-white font-medium shadow-md hover:brightness-110">
            + Schedule Interview
          </Button>
        </Link>
      </div>

      {loading ? (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {renderSkeletons()}
        </section>
      ) : interviewList.length > 0 ? (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {interviewList.map((interview, index) => (
            <InterviewCard {...interview} key={index} />
          ))}
        </section>
      ) : (
        <div className="flex flex-col items-center justify-center py-24">
          <p className="text-[#F0A7C3] text-xl font-medium text-center">
            You don’t have any interviews lined up yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default InterviewDashboard;
