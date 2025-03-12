import React, { useEffect, useState } from "react";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import ResumePDF from "@/components/resume/pdf/ResumePDF";
import { ResumeInfoContext } from "@/context/ResumeInfoProvider";
import { useParams } from "react-router-dom";
import API from "@/lib/ServerAPI";
import ResumrPreview from "@/components/resume/ResumeEditPreview";

const ResumeView = () => {
  const param = useParams();
  const [resumeInfo, setResumeInfo] = useState<IResumeInfo | undefined>();
  const resumeId = param.id;
  let resumeTitle;
  useEffect(() => {
    const getResume = async () => {
      try {
        const response = await API.get(`/get-resume/${resumeId}`);
        console.log(response.data);
        setResumeInfo(response.data);
        resumeTitle = response.data.resumeTitle;
      } catch (error) {}
    };
    getResume();
  }, []);
  return (
    <div className="w-full min-h-screen">
      <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
        <div className="w-2/4 m-auto">
          <ResumrPreview />
        </div>
        {/* <PDFDownloadLink document={<ResumePDF resumeInfo={resumeInfo} />} fileName="resume.pdf">
    {({ loading }) => (loading ? "Generating PDF..." : "Download Resume")}
            </PDFDownloadLink> */}
        <div className="h-[150vh]">
          <PDFViewer width={"100%"} height={"100%"}>
            <ResumePDF resumeInfo={resumeInfo} />
          </PDFViewer>
        </div>
      </ResumeInfoContext.Provider>
    </div>
  );
};

export default ResumeView;
