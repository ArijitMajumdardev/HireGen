import { createContext, ReactNode, useContext } from "react";

interface IResumeContext{
    
}

const ResumeInfoContext = createContext<IResumeContext|undefined>(undefined)

const ResumeInfoProvider = ({children}:{ children: ReactNode }) => {
    
    return (
        <ResumeInfoContext.Provider >
            {children}
        </ResumeInfoContext.Provider>
    )
}



 const useResumeInfo = () => {
    const context = useContext(ResumeInfoContext);
    if (!context) {
      throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
  };

export {useResumeInfo,ResumeInfoProvider}