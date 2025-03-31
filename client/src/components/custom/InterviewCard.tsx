import React from 'react'
import dayjs from 'dayjs'
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { cn, getRandomInterviewCover } from '@/lib/utils';
import DisplayTechIcons from './DisplayTechIcons';

const InterviewCard =  ({
  interviewId,
  userId,
  role,
  type,
  techstack,
  createdAt,
}: InterviewCardProps) => {
  // const feedback = 
  //   userId && interviewId
  //     ? await getFeedbackByInterviewId({
  //         interviewId,
  //         userId,
  //       })
  //     : null;
  const normalizedType = /mix/gi.test(type) ? "Mixed" : type;
  const badgeColor ={
    Behavioral: "bg-light-400",
    Mixed: "bg-light-600",
    Technical: "bg-light-800",
  }[normalizedType] || "bg-light-600";

  const feedback = '';
      const formattedDate = dayjs(
        feedback?.createdAt || createdAt || Date.now()
      ).format("MMM D, YYYY");
  return (
    <div className="card-border w-[360px] max-sm:w-full min-h-96 text-white ">
      <div className="card-interview">
        <div>
          {/* Type Badge */}
          <div
            className={cn(
              " bg-gray-600 absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg "
            )}
          >
            <p className="badge-text ">{normalizedType}</p>
          </div>

          {/* Cover Image */}
          <img
            src={getRandomInterviewCover()}
            alt="cover-image"
            className="rounded-full object-fit size-[80px]"
            loading="lazy"
          />

          {/* Interview Role */}
          <h3 className="mt-5 capitalize font-bold">{role} Interview</h3>

          {/* Date & Score */}
          <div className="flex flex-row gap-5 mt-3">
            <div className="flex flex-row gap-2">
              <img
                src="/calendar.svg"
                width={22}
                height={22}
                alt="calendar"
              />
              <p>{formattedDate}</p>
            </div>

            <div className="flex flex-row gap-2 items-center">
              <img src="/star.svg" width={22} height={22} alt="star" />
              <p>{feedback?.totalScore || "---"}/100</p>
            </div>
          </div>

          {/* Feedback or Placeholder Text */}
          <p className="line-clamp-2 mt-5 text-gray-300">
            {feedback?.finalAssessment ||
              "You haven't taken this interview yet. Take it now to improve your skills."}
          </p>
        </div>

        <div className="flex flex-row justify-between">
          <DisplayTechIcons techStack={techstack} />

          <Button className="bg-[#4e7aff]">
            <Link
              to={
                feedback
                  ? `/interview/${interviewId}/feedback`
                  : `/interview/${interviewId}`
              }
            >
              {feedback ? "Check Feedback" : "View Interview"}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default InterviewCard