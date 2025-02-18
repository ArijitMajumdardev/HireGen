import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useResumeInfo } from '@/context/ResumeInfoProvider';
import API from '@/lib/ServerAPI';
import { Brain, LoaderCircle } from 'lucide-react';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

const Summary = ({ enabledNext }: { enabledNext: React.Dispatch<boolean> }) => {
  const { resumeInfo, setResumeInfo } = useResumeInfo()
  const [summery,setSummery]=useState<string>();
  const [loading,setLoading]=useState(false);
  const params = useParams();
  const resumeId = params.id
  const [aiGeneratedSummeryList, setAiGenerateSummeryList] = useState();
  

//   const GenerateSummeryFromAI=async()=>{
//     setLoading(true)
//     const PROMPT=prompt.replace('{jobTitle}',resumeInfo?.jobTitle);
//     console.log(PROMPT);
//     const result=await AIChatSession.sendMessage(PROMPT);
//     console.log(JSON.parse(result.response.text()))
   
//     setAiGenerateSummeryList(JSON.parse(result.response.text()))
//     setLoading(false);
// }

  const onSave= async(e:any)=>{
    e.preventDefault();
    
    try {
    setLoading(true)
    
    const response = await API.put('/update-resume', { data : summery, resumeId }, {
      headers: {
        "Content-Type":"application/json"
      }
    })
      console.log(response)
        enabledNext(true);
        setLoading(false);
      toast.success(response.data.message)
    } catch (error:any) {
      console.log("sdd", error?.response.data)
      setLoading(false);
      toast.error(error.response.data)
  }
    // setLoading(false)
  }


  return (
    <div>
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
   <h2 className='font-bold text-lg'>Summery</h2>
   <p>Add Summery for your job title</p>

   <form className='mt-7' onSubmit={onSave}>
       <div className='flex justify-between items-end'>
           <label>Add Summery</label>
           <Button variant="outline" 
           type="button" size="sm" className="border-primary text-primary flex gap-2"> 
           <Brain className='h-4 w-4' />  Generate from AI</Button>
       </div>
       <Textarea className="mt-5" required
       value={summery}
           defaultValue={summery?summery:resumeInfo?.summery}
       onChange={(e)=>setSummery(e.target.value)}
       />
       <div className='mt-2 flex justify-end'>
       <Button type="submit"
           disabled={loading}>
               {loading?<LoaderCircle className='animate-spin' />:'Save'}
               </Button>
       </div>
   </form>
   </div>

   
  {/* {aiGeneratedSummeryList&& <div className='my-5'>
       <h2 className='font-bold text-lg'>Suggestions</h2>
       {aiGeneratedSummeryList?.map((item,index)=>(
           <div key={index} 
           onClick={()=>setSummery(item?.summary)}
           className='p-5 shadow-lg my-4 rounded-lg cursor-pointer'>
               <h2 className='font-bold my-1 text-primary'>Level: {item?.experience_level}</h2>
               <p>{item?.summary}</p>
           </div>
       ))}
   </div>} */}

</div>
  )
}

export default Summary