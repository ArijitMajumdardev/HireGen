import React, { SetStateAction } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { IResumeList } from "@/pages/resume/Dashboard";
import { Link } from "react-router-dom";
import DropDownResumeCard from "./DropDownResumeCard";

const formatDate = (isoString: string) => {
  return new Date(isoString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const ResumeCard = ({
  resumeList,
  setResumeList,
}: {
  resumeList: IResumeList[];
  setResumeList: React.Dispatch<SetStateAction<IResumeList[]>>;
}) => {
  return (
    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {resumeList.map((resume, index) => (
        <motion.div
          key={resume.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="relative"
        >
          <Link to={`/resume/${resume.id}/edit`}>
            <Card className="bg-accent-2 border border-gray-700 text-white rounded-3xl shadow-lg hover:shadow-[#777AF1]/30 transition duration-300 hover:scale-[1.02]">
              <CardHeader className="flex flex-col items-center gap-2 pt-6">
                <FileText className="w-10 h-10 text-[#777AF1]" />
                <CardTitle className="text-lg font-semibold text-center">
                  {resume.resumeTitle}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center text-sm text-gray-300 pb-6">
                Last edited: <br />
                <span className="text-gray-400">{formatDate(resume.createdAt)}</span>
              </CardContent>
            </Card>
          </Link>

          <DropDownResumeCard
            className="absolute top-2 right-2"
            setResumeList={setResumeList}
            resume={resume}
            index={index}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default ResumeCard;
