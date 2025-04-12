import dayjs from "dayjs";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { getRandomInterviewCover } from "@/lib/utils";
import DisplayTechIcons from "./DisplayTechIcons";
import { CalendarDays, Star } from "lucide-react";

const InterviewCard = ({
  id,
  role,
  type,
  techstack,
  createdAt,
  feedback,
}: InterviewCardProps) => {
  const normalizedType = /mix/gi.test(type) ? "Mixed" : type;
  const formattedDate = dayjs(feedback?.createdAt || createdAt || Date.now()).format("MMM D, YYYY");

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="relative bg-base-1 border border-[#272533] rounded-2xl shadow-lg w-[360px] max-sm:w-full min-h-[420px] p-6 text-white flex flex-col justify-between"
    >
      {/* Badge */}
      <div className="absolute top-0 right-0  px-3 py-1 rounded-bl-xl text-xs font-semibold bg-primary-1 text-white uppercase tracking-wide shadow-sm">
        {normalizedType}
      </div>

      {/* Top Section */}
      <div>
        <div className="flex justify-center mb-5">
          <motion.img
            whileHover={{ rotate: 3 }}
            src={getRandomInterviewCover()}
            alt="cover"
            className="w-20 h-20 rounded-full object-cover border-2 border-[#777AF1] shadow-md"
          />
        </div>

        <h3 className="text-xl font-bold text-center capitalize tracking-wide text-white">
          {role} Interview
        </h3>

        <div className="flex justify-center gap-6 mt-4 text-sm text-[#F0A7C3]">
          <div className="flex items-center gap-2">
            {/* <img src="/calendar.svg" alt="calendar" className="w-5 h-5 opacity-80" /> */}
            <CalendarDays className="size-4" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-2">
            {/* <img src="/star.svg" alt="star" className="w-5 h-5 opacity-80" /> */}
            <Star className="size-4" />
            <span>{feedback?.totalScore ?? "---"}/100</span>
          </div>
        </div>

        <p className="mt-5 text-sm text-center text-[#cccccc] line-clamp-2">
          {feedback?.finalAssessment ??
            "You haven't taken this interview yet. Take it now to improve your skills."}
        </p>
      </div>

      {/* Bottom Section */}
      <div className="mt-6 flex items-center justify-between">
        <DisplayTechIcons techStack={techstack} />
        <motion.div whileTap={{ scale: 0.95 }}>
          <Button
            className="bg-primary-1  hover:bg-primary-1 text-white transition duration-200 px-4 py-2 rounded-xl"
          >
            <Link to={feedback ? `/interview/${id}/feedback` : `/interview/${id}`}>
              {feedback ? "Check Feedback" : "View Interview"}
            </Link>
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default InterviewCard;
