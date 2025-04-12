import Testimonials from "@/components/custom/Tesitimonials";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/context/AuthProvider";
import { Link } from "react-router-dom";

export default function Home() {
  const { setOpenAuthDialog, isLogged } = useAuthContext();
  const HandleLoginDialog = () => {
    setOpenAuthDialog(true);
  };

  return (
    <div className="min-h-screen flex flex-col ">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-16 px-6">
        <button className=" rounded-full border-[#F0A7C3] border px-2 mb-10 font-normal text-gray-300 text-sm ">
          #1 platform for career
        </button>

        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          Master Interviews &
          <br />
          Resumes At{" "}
          <span className="bg-gradient-to-r from-[#F0A7C3] to-[#777AF1] bg-clip-text text-transparent">
            HireGen
          </span>
        </h1>
        <p className="text-gray-300 max-w-xl text-lg font-normal">
          Practice AI-driven mock interviews, build standout resumes, and
          analyze your profile with smart AI insights – all in one place
        </p>
        {isLogged ? (
          <div className=" w-[35vw] flex flex-col items-center md:flex-row md:justify-evenly md:gap-3">
            <Link to={"/interview/generate"}>
              <Button className="mt-6 p-6 rounded-full bg-[#777AF1]  hover:bg-[#9092f8] ">
                Mock Interview
              </Button>
            </Link>

            <Link to={"/dashboard"}>
              <Button className="mt-6 p-6 rounded-full border-[#F0A7C3] border bg-transparent">
                Create Resume
              </Button>
            </Link>
          </div>
        ) : (
          <div className=" w-[35vw] flex flex-col items-center md:flex-row md:justify-evenly md:gap-3">
            <Button
              className="mt-6 p-6 rounded-full bg-[#777AF1]  hover:bg-[#9092f8] "
              onClick={HandleLoginDialog}
            >
              Mock Interview
            </Button>

            <Button
              className="mt-6 p-6 rounded-full border-[#F0A7C3] border bg-transparent"
              onClick={HandleLoginDialog}
            >
              Create Resume
            </Button>
          </div>
        )}
      </section>

      {/* Trusted By Section */}
      <section className="px-6  bg-[#0A071A] text-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-300 mb-6">
            Our users have landed roles at
          </h2>

          <div className="flex flex-wrap justify-center gap-10 items-center">
            <img
              src="/public/logos/google.svg"
              alt="Google"
              className="h-8  hover:opacity-100 transition"
              style={{ filter: "invert(1)" }}
            />
            <img
              src="/public/logos/meta.svg"
              alt="Meta"
              className="h-8 grayscale opacity-80 hover:opacity-100 transition"
              style={{ filter: "invert(1)" }}
            />
            <img
              src="/public/logos/amazon.svg"
              alt="Amazon"
              className="h-8 grayscale opacity-80 hover:opacity-100 transition"
              style={{ filter: "invert(1)" }}
            />
            <img
              src="/public/logos/microsoft-alt-svgrepo-com.svg"
              alt="Microsoft"
              className="h-8  grayscale opacity-80 hover:opacity-100 transition"
              style={{ filter: "invert(1)" }}
            />
            <img
              src="/public/logos/netflix-svgrepo-com.svg"
              alt="Netflix"
              className="h-8 grayscale opacity-80 hover:opacity-100 transition"
              style={{ filter: "invert(1)" }}
            />
            <img
              src="/public/logos/stripe.svg"
              alt="Stripe"
              className="h-8 grayscale opacity-80 hover:opacity-100 transition"
              style={{ filter: "invert(1)" }}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-20 mt-16 px-6 bg-[#050020] text-white"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Everything You Need to Get Hired
        </h2>
        <p className="text-center font-bold max-w-xl mx-auto mb-16 text-base text-gray-400">
          HireGen offers AI-powered mock interviews, resume creation, and
          in-depth resume analysis — all in one seamless platform.
        </p>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="flex flex-col gap-6 col-span-2 ">
            {/* Top Left Card */}
            <div className="bg-[#262433] p-6 rounded-[5rem] flex items-center justify-end h-[350px] ">
              <div className="w-1/3 h-[300px] flex items-center justify-center  ">
                <img
                  src="/icons/mock_interview.png"
                  alt="AI Bot Icon"
                  className="rounded-l-[4rem] w-full h-full object-cover"
                />
              </div>
              <div className="bg-[#777AF1] p-6  text-white font-semibold w-2/3 h-[300px] rounded-r-[4rem]  overflow-clip">
                <h2 className="text-black font-bold text-lg ">
                  Mock Interviews with AI <br /> Voice Agents
                </h2>
                <p className="mt-4 font-normal text-[15px] ">
                  Simulate real-world interview scenarios with lifelike AI voice
                  agents. Practice answering job-specific questions, get instant
                  feedback, and build confidence before your next big interview.
                </p>
              </div>
            </div>

            {/* Bottom Left Card */}
            <div className="bg-[#262433] p-6 rounded-[5rem] flex md:flex-row items-center justify-start md:h-[280px] md:w-[580px] ml-auto flex-col-reverse h-[540px] ">
              <div className="bg-[#777AF1] p-6 md:rounded-none md:rounded-l-[4rem] text-white font-semibold md:w-3/5 md:h-[250px] h-2/4 rounded-b-[4rem] overflow-clip ">
                <h2 className="text-black font-bold text-lg">
                  AI-Powered <br /> Resume Analysis
                </h2>
                <p className="font-normal text-[15px] mt-2">
                  Get detailed AI-driven feedback on your resume. Discover
                  readability scores, and actionable tips to improve your
                  chances of passing ATS systems and impressing recruiters.
                </p>
              </div>
              <div className="md:w-2/5 md:h-[250px] flex items-center justify-center h-2/4 w-full  ">
                <img
                  src="/icons/resume_analysis.png"
                  alt="AI Bot Icon"
                  className="md:rounded-r-[4rem] rounded-t-[4rem] md:rounded-none w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right Tall Card */}
          <div className="bg-[#262433] p-6 rounded-[5rem] flex flex-col items-center  justify-center h-[540px] ">
            <div className="h-2/4 w-full flex items-center justify-center">
              <img
                src="/icons/resume_builder.png"
                alt="AI Bot Icon"
                className="rounded-t-[4rem] w-full h-full object-cover"
              />
            </div>
            <div className="bg-[#F0A7C3]/70  p-5 rounded-b-[4rem] text-white font-semibold w-full text-center h-2/4 overflow-clip">
              <h2 className=" font-bold text-lg text-black">
                Professional Resume <br /> Builder Backed by AI
              </h2>
              <p className="font-normal text-[15px] mt-2 ">
                Create polished, job-winning resumes in minutes. Choose from
                expertly designed templates and let AI guide you through every
                section with smart content suggestions.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Testimonials />
    </div>
  );
}
