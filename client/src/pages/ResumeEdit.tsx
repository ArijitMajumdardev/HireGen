import ResumeForm from '@/components/resume/ResumeEditForm'
import ResumePreview from '@/components/resume/ResumeEditPreview'
import { ResumeInfoContext} from '@/context/ResumeInfoProvider'
import dummy from '@/Data/dummy'
import API from '@/lib/ServerAPI'
import  React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

// interface ResumeInfo{

// }




const ResumeEdit = () => {
  const param = useParams()
  const [resumeInfo, setResumeInfo] = useState<IResumeInfo|undefined>();
const resumeId = param.id
 
useEffect(() => {
  const getResume = async ()=>{
   try {
    const response = await API.get(`/get-resume/${resumeId}`);
    console.log(response.data)
    setResumeInfo(response.data)   
   } catch (error) {
    
   }
  }
  getResume()
  }, [])
 
  return (

   
 <ResumeInfoContext.Provider value={{resumeInfo,setResumeInfo}}>
      
    <div className=' grid grid-cols-1 md:grid-cols-2 gap-10 p-10'>
        <ResumeForm resumeId={param.id as string}  />
      <ResumePreview/>

    </div>
 </ResumeInfoContext.Provider>
  )
}

export default ResumeEdit