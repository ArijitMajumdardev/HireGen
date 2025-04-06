import SharedResumePreview from "@/components/resume/SharedResumePreview";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SharedResumePage = () => {
  const param = useParams();
  const [resumeInfo, setResumeInfo] = useState<IResumeInfo | undefined>();
  const resumeId = param.id;
  console.log("res", resumeId);
  useEffect(() => {
    const getResume = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}share/get-resume/${resumeId}`
        );
        console.log("response", response);
        setResumeInfo(response.data);
      } catch (error) {}
    };
    getResume();
  }, []);

  return (
    <div className="my-10 mx-10 md:mx-20 lg:mx-36">
      <div>
        <SharedResumePreview resumeInfo={resumeInfo} />
      </div>
    </div>
  );
};

export default SharedResumePage;
