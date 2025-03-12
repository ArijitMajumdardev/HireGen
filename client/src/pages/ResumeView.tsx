import React, { useEffect, useState } from "react";
import { PDFDownloadLink} from "@react-pdf/renderer";
import ResumePDF from "@/components/resume/pdf/ResumePDF";
import { ResumeInfoContext } from "@/context/ResumeInfoProvider";
import { useParams } from "react-router-dom";
import API from "@/lib/ServerAPI";
import ResumePreview from "@/components/resume/ResumeEditPreview";
import { Button } from "@/components/ui/button";
import { RWebShare } from 'react-web-share'

const ResumeView = () => {
  const param = useParams();
  const [resumeInfo, setResumeInfo] = useState<IResumeInfo | undefined>();
  const resumeId = param.id;
  useEffect(() => {
    const getResume = async () => {
      try {
        const response = await API.get(`/get-resume/${resumeId}`);
        setResumeInfo(response.data);
      } catch (error) {}
    };
    getResume();
  }, []);
    

    
    
  return (
    <div className="w-full min-h-screen">
      <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
              <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
            <h2 className='text-center text-2xl font-medium'>
                Your Resume is ready ! </h2>
                <p className='text-center text-gray-400'>Now you are ready to download your resume and you can share unique 
                    resume url  </p>
            <div className='flex justify-between px-44 my-10'>
                      <Button >
                      <PDFDownloadLink document={<ResumePDF resumeInfo={resumeInfo} />} fileName={resumeInfo?.resumeTitle+"_Resume"}>
    {({ loading }) => (loading ? "Generating PDF..." : "Download Resume")}
            </PDFDownloadLink>
                </Button>
               
                <RWebShare
        data={{
          text: "Hello Everyone, This is my resume please open url to see it",
          url: import.meta.env.VITE_BASE_URL+"my-resume/"+resumeId+"/view",
          title: resumeInfo?.firstName+" "+resumeInfo?.lastName+" resume",
        }}
        onClick={() => console.log("shared successfully!")}
                      >
                          <Button>Share</Button>
                      </RWebShare>
                      

            </div>
        </div>
            
       
        <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
        <div>
                <ResumePreview/>
            </div>
            </div>
              

      </ResumeInfoContext.Provider>
    </div>
  );
};

export default ResumeView;
