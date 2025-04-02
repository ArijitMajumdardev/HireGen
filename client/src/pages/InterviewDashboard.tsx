import InterviewCard from "@/components/custom/InterviewCard";
import { dummyInterviews } from "@/constants/DummyData";
import { useAuthContext } from "@/context/AuthProvider";
import API from "@/lib/ServerAPI";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const InterviewDashboard = () => {
    const { user} = useAuthContext();
    console.log()
    const [interviewList,setInterviewList] = useState<Interview[]>([])

    useEffect(() => {
        if (!user?.id) return;
      console.log("Usersing in ",user?.id)
      const getInterviews = async () => {
        try {
            const response = await API.get("/get-user-interviews/"+user?.id,{
              headers: {
                "Content-Type":"application/json"
              }
            })
      
             console.log(response.data)
             setInterviewList(response.data)
           } catch (error: any) {
             console.log(error)
             if (error.response?.status === 401) {
              window.location.href = "/"; // Redirect to login/home
            }
            toast.error(error.response?.data ||"Something went wrong");
           }
    };

    getInterviews();
  }, [user]);

  return (
    <div className="min-h-screen bg-[#0a0b10] p-5">
      <h1 className="font-bold text-white text-3xl">Your Interviews</h1>
          {interviewList?.length as number > 0 ?
              <section className="py-16 px-6  grid grid-cols-3 gap-5">
              
                  {interviewList?.map((interview,index) => (
                      <InterviewCard {...interview} key={index} />
                  ))
                  }
              </section> : (
                <p className="text-gray-400 text-xl py-20 ">
                    You dont have any interviews lined up
                </p>
            )
          }
    </div>
  );
};

export default InterviewDashboard;
