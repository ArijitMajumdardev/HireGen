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
    <div className="min-h-screen flex flex-col ">
    

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-36 px-6">
      <button className=" rounded-full border-[#F0A7C3] border px-1 mb-10" >
          #1 platform for career 
        </button>

        <h1 
          className="text-4xl md:text-6xl font-bold text-white mb-4"
        >
          Master Interviews & 
          <br />
          Resumes At <span className="bg-gradient-to-r from-[#F0A7C3] to-[#777AF1] bg-clip-text text-transparent">HireGen</span>
        </h1>
        <p className="text-gray-300 max-w-xl text-lg font-normal">
        Practice AI-driven mock interviews, build standout resumes, and analyze your profile with smart AI insights – all in one place
        </p>{
          isLogged ?
            <div className=" w-[35vw] flex flex-col items-center md:flex-row md:justify-evenly md:gap-3">
               <Link to={"/interview/generate"}>
            <Button className="mt-6 p-6 rounded-full bg-[#777AF1]  hover:bg-[#9092f8] " >
          Mock Interview 
                </Button>
                
              </Link>

            <Link to={"/dashboard"}>
            <Button className="mt-6 p-6 rounded-full border-[#F0A7C3] border" >
          Create Resume 
        </Button>
            </Link>
           
            </div>
          :<Button className="mt-6 flex items-center gap-2" onClick={HandleLoginDialog}>
          Get Started <ArrowRight className="w-4 h-4" />
        </Button>
        }
      </section>


      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-gray-100">
       
      </section>

     
    </div>
  );
}
