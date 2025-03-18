import React, { SetStateAction } from 'react'
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { IResumeList } from '@/pages/Dashboard';
import { Link } from 'react-router-dom';
import DropDownResumeCard from './DropDownResumeCard';


const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  
const ResumeCard = ({resumeList,setResumeList}:{resumeList:IResumeList[],setResumeList:React.Dispatch<SetStateAction<IResumeList[]>>}) => {
  return (
      <div className='mt-4 grid grid-cols-1 md:grid-cols-3 gap-6 '>
          {
        resumeList.length > 0 && resumeList.map((resume, index) => (
          <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className='relative'
          >
              <Link to={`/resume/${resume.id}/edit`}>
              <Card>
                <CardHeader className="flex flex-col items-center">
                  <FileText className={`w-10 h-10 text-blue-500`} />
                  <CardTitle>{resume.resumeTitle}</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-gray-600">
                Last edited: {formatDate(resume.createdAt)}
                </CardContent>
              </Card>
            </Link>
            <DropDownResumeCard className="absolute top-2 right-1" setResumeList={setResumeList} resume={resume} index ={index} />
          </motion.div>
          

        ))}
    </div>
  )
}

export default ResumeCard