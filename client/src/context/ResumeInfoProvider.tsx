
import { createContext, SetStateAction, useContext } from "react";


export interface IResumeContext{
  resumeInfo: IResumeInfo|undefined
setResumeInfo: React.Dispatch<SetStateAction<IResumeInfo|undefined>>
}




const ResumeInfoContext = createContext<IResumeContext|undefined>(undefined)



 const useResumeInfo = () => {
    const context = useContext(ResumeInfoContext);
    if (!context) {
      throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
  };

export {useResumeInfo,ResumeInfoContext}