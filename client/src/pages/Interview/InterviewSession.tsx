import DisplayTechIcons from '@/components/custom/DisplayTechIcons'
import Agent from '@/components/VoiceAgent/Agent'
import { useAuthContext } from '@/context/AuthProvider'
import API from '@/lib/ServerAPI'
import { getRandomInterviewCover } from '@/lib/utils'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'

const InterviewSession = () => {
    const param = useParams()
    const interviewId = param.id
    const { user } = useAuthContext();
        const [interview,setInterview] = useState<Interview>()
    
    useEffect(() => {
        if (!user?.id) return;
      console.log("Usersing in ",user?.id)
      const getInterviews = async () => {
        try {
            const response = await API.get("/get-interview/"+interviewId,{
              headers: {
                "Content-Type":"application/json"
              }
            })
      
             console.log(response.data)
             setInterview(response.data)
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
    <>
    <div className="flex flex-col items-center gap-2 mt-3">
      <div className="flex flex-row gap-4 items-center max-sm:flex-col">
        <div className="flex flex-row gap-4 items-center">
          <img
            src={getRandomInterviewCover()}
            alt="cover-image"
            width={40}
            height={40}
            className="rounded-full object-cover size-[40px]"
          />
          <h3 className="capitalize text-xl font-bold">{interview?.role} Interview</h3>
        </div>

        <DisplayTechIcons techStack={interview?.techstack!} />
      </div>

      <p className="text-gray-400">
        {interview?.type}
      </p>
    </div>

    <div className="max-w-5xl mx-auto bg-[#272533] rounded-2xl shadow-md p-8">
    <Agent
      userName={user?.name!}
      userId={user?.id!}
      interviewId={interviewId!}
      type="interview"
      questions={interview?.questions!}
        />
        </div>
  </>
  )
}

export default InterviewSession