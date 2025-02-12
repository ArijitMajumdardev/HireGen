import ResumeForm from '@/components/resume/Form'
import ResumrPreview from '@/components/resume/Preview'
import { ResumeInfoProvider } from '@/context/ResumeInfoProvider'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const ResumeEdit = () => {
    const param = useParams()

    useEffect(() => {
       console.log(param) 
    }, [])
  
  
  return (

    <ResumeInfoProvider>

    <div className=' grid grid-cols-1 md:grid-cols-2 gap-10 p-10'>
      <ResumeForm />
      <ResumrPreview/>

    </div>
    </ResumeInfoProvider>
  )
}

export default ResumeEdit