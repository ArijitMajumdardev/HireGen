
import CreateResumeDialog from "@/components/custom/CreateResumeDialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, FileText } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import API from "@/lib/ServerAPI";
import toast from "react-hot-toast";
import ResumeCard from "@/components/custom/ResumeCard";

export interface IResumeList{
  createdAt : string
  userEmail : string
  id : string
  resumeTitle : string
}

export default function Dashboard() {
  const [openDialog, setOpenDialog] = useState(false);
  const [resumeList,setResumeList] = useState<IResumeList[]>([])

  // Function to start the resume process
  const startResumeProcess = () => {
    setOpenDialog(true);
  };


  useEffect(() => {
    
    const getResumeList = async () => {
     try {
      const response = await API("/resume-list",{
        headers: {
          "Content-Type":"application/json"
        }
      })

       console.log(response.data)
       setResumeList(response.data)
     } catch (error: any) {
       console.log(error)
       if (error.response?.status === 401) {
        window.location.href = "/"; // Redirect to login/home
      }
      toast.error(error.response?.data || "Something went wrong");
     }
    }

    getResumeList()

  },[])

  return (
    <motion.div 
      className="min-h-screen py-10 px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1 
        className="text-3xl font-bold mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Dashboard
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
        {/* Create Resume Card */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Card
            className="h-40 flex items-center justify-center cursor-pointer hover:bg-gray-100 transition border-dashed border-gray-400 border-2"
            onClick={startResumeProcess}
          >
            <CardHeader className="flex flex-col items-center">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ yoyo: Infinity, duration: 1.2, ease: "easeInOut" }}
              >
                <Plus className="w-12 h-12 text-gray-600" />
              </motion.div>
              <CardTitle>Create New Resume</CardTitle>
            </CardHeader>
          </Card>
        </motion.div>

        {/* Existing Resume (Example Cards) */}
        {/* {[{ title: "Resume 1", date: "Jan 30, 2025", color: "text-blue-500" },
          { title: "Resume 2", date: "Feb 2, 2025", color: "text-green-500" }]
          .map((resume, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card>
                <CardHeader className="flex flex-col items-center">
                  <FileText className={`w-10 h-10 ${resume.color}`} />
                  <CardTitle>{resume.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-gray-600">
                  Last edited: {resume.date}
                </CardContent>
              </Card>
            </motion.div>
        ))} */}

      </div>
      <ResumeCard resumeList={resumeList} setResumeList={setResumeList} />

      <CreateResumeDialog openDialog={openDialog} setOpenDialog={setOpenDialog} />
    </motion.div>
  );
}
