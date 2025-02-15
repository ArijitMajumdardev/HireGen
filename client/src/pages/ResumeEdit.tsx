import ResumeForm from '@/components/resume/ResumeEditForm'
import ResumrPreview from '@/components/resume/ResumeEditPreview'
import { ResumeInfoContext} from '@/context/ResumeInfoProvider'
import dummy from '@/Data/dummy'
import  React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

// interface ResumeInfo{

// }




const ResumeEdit = () => {
  const param = useParams()
  const [resumeInfo, setResumeInfo] = useState<IResumeInfo|undefined>();

    useEffect(() => {
       setResumeInfo(dummy)
    }, [])
  
  
 
  return (

   
 <ResumeInfoContext.Provider value={{resumeInfo,setResumeInfo}}>
      
    <div className=' grid grid-cols-1 md:grid-cols-2 gap-10 p-10'>
      <ResumeForm resumeId={param.id} />
      <ResumrPreview/>

    </div>
 </ResumeInfoContext.Provider>
  )
}

export default ResumeEdit