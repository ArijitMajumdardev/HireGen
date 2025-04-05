import InterviewCard from "@/components/custom/InterviewCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { dummyInterviews } from "@/constants/DummyData";
import { useAuthContext } from "@/context/AuthProvider";
import { motion } from "framer-motion";
import { ArrowRight, FileText, Rocket, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";


export default function Home() {

  const {  setOpenAuthDialog,isLogged } = useAuthContext()
  const HandleLoginDialog = () => {
    setOpenAuthDialog(true)
  }

  
  return (
    <div className="min-h-screen flex flex-col">
    

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-48 px-6">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Build Your Resume with AI in Minutes ✨
        </motion.h1>
        <p className="text-gray-600 max-w-lg text-lg">
          Generate professional resumes effortlessly using AI. No design skills required!
        </p>{
          isLogged ?
            <div className=" w-[35vw] flex flex-col items-center md:flex-row md:justify-evenly md:gap-3">
            <Link to={"/dashboard"}>
            <Button className="mt-6 p-6 flex items-center gap-2 border-zinc-500 border-2" >
          Create Resume 
        </Button>
            </Link>
            <Link to={"/interview/generate"}>
            <Button className="mt-6 p-6 flex items-center gap-2 bg-[#4e7aff] text-white hover:bg-[#658CFF] border-zinc-400 border" >
          Start an Interview 
        </Button>
              </Link>
            </div>
          :<Button className="mt-6 flex items-center gap-2" onClick={HandleLoginDialog}>
          Get Started <ArrowRight className="w-4 h-4" />
        </Button>
        }
      </section>

      {/* Your past interview sections */}
      {
        isLogged ?
        <section className="py-20 px-6  grid grid-cols-3 gap-5">
            {dummyInterviews.map((interview) => (
              <InterviewCard {...interview} />
          ))}
        </section>:<></>
      }

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-6 bg-gray-100">
        <h2 className="text-center text-3xl font-bold mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card>
            <CardHeader className="flex flex-col items-center">
              <Rocket className="w-10 h-10 text-blue-500" />
              <CardTitle>Step 1: Enter Your Info</CardTitle>
            </CardHeader>
            <CardContent>
              Fill in your details and let AI handle the rest.
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-col items-center">
              <Sparkles className="w-10 h-10 text-green-500" />
              <CardTitle>Step 2: AI Generates</CardTitle>
            </CardHeader>
            <CardContent>
              Watch AI craft a polished, job-winning resume for you.
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-col items-center">
              <FileText className="w-10 h-10 text-purple-500" />
              <CardTitle>Step 3: Download & Apply</CardTitle>
            </CardHeader>
            <CardContent>
              Download your resume and start applying for your dream job.
            </CardContent>
          </Card>
        </div>
      {/* <SignUpDialog openDialog={openAuthDialog} setOpenDialog={setOpenAuthDialog}/> */}
      </section>

     
    </div>
  );
}
