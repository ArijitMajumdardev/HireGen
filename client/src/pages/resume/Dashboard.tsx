
import CreateResumeDialog from "@/components/custom/CreateResumeDialog";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { FileSearch, Plus} from "lucide-react";
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
  const [resumeList, setResumeList] = useState<IResumeList[]>([])
  const [loading,setLoading] = useState(true)

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
       setLoading(false)
     } catch (error: any) {
       console.log(error)
       if (error.response?.status === 401) {
        window.location.href = "/"; // Redirect to login/home
      }
       toast.error(error.response?.data || "Something went wrong");
       setLoading(false)
       
     }
    }

    getResumeList()

  }, [])
  

  const renderSkeletons = () => {
    return Array.from({ length: 3 }).map((_, index) => (
      <div
        key={index}
        className="animate-pulse bg-[#272533] rounded-3xl h-56 w-full shadow-md"
      ></div>
    ));
  };
  
  return (
    <motion.div
      className="min-h-screen py-12 px-6 bg-[#050020] text-white md:w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="text-2xl font-semibold mb-14 text-center "
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Your Resume Workspace
      </motion.h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Create Resume Card */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className=" h-64 rounded-3xl  md:w-64 w-full"
        >
          <Card
            className="h-64 bg-[#262433] border border-gray-700 rounded-3xl shadow-md flex flex-col items-center justify-center cursor-pointer hover:bg-[#312f46]/80 transition"
            onClick={startResumeProcess}
          >
            <CardHeader className="flex flex-col items-center gap-4">
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", repeatType: "reverse" }}
              >
                <Plus className="w-12 h-12 text-[#777AF1]" />
              </motion.div>
              <CardTitle className="text-lg font-semibold text-white">
                Create New Resume
              </CardTitle>
            </CardHeader>
          </Card>
        </motion.div>

         {/* Resume Analysis Card */}
         <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="h-64 rounded-3xl md:w-64 w-full"
        >
          <Card
            className="h-64 bg-[#262433] border border-gray-700 rounded-3xl shadow-md flex flex-col items-center justify-center cursor-pointer hover:bg-[#312f46]/80 transition"
            onClick={() => window.location.href = "/resume-analysis"}
          >
            <CardHeader className="flex flex-col items-center gap-4">
              <motion.div
                initial={{ rotate: -10 }}
                animate={{ rotate: 10 }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "easeInOut",
                  repeatType: "reverse",
                }}
              >
                <FileSearch className="w-12 h-12 text-[#68D3C6]" />
              </motion.div>
              <CardTitle className="text-lg font-semibold text-white">
                Resume Analysis
              </CardTitle>
            </CardHeader>
          </Card>
        </motion.div>

      </div>
      {/* Render Resume Cards */}
      {
        loading && (
          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-10">
          {renderSkeletons()}
        </section>
        )
      }
        {!loading && resumeList.length > 0 && (
          <ResumeCard resumeList={resumeList} setResumeList={setResumeList} />
        )}
        {!loading && resumeList.length == 0 && (
        <div className="mt-10 text-center font-semibold text-lg text-accent-1">
          <p>You don't have any resume </p>
          </div>
        )}

      <CreateResumeDialog openDialog={openDialog} setOpenDialog={setOpenDialog} />
    </motion.div>
  );
}
