import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
      <section className="flex flex-col items-center justify-center text-center py-20 px-6">
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
            <Link to={"/dashboard"}>
            <Button className="mt-6 flex items-center gap-2" >
          Create Resume <ArrowRight className="w-4 h-4" />
        </Button>
            </Link>
          :<Button className="mt-6 flex items-center gap-2" onClick={HandleLoginDialog}>
          Get Started <ArrowRight className="w-4 h-4" />
        </Button>
        }
      </section>

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
