import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useResumeInfo } from '@/context/ResumeInfoProvider';
import API from '@/lib/ServerAPI';
import { AIChatSession } from '@/services/AiModel';
import { Brain, LoaderCircle } from 'lucide-react';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

const prompt="Job Title: {jobTitle} , Depends on job title give me list of  summery for 3 experience level, Mid Level and Freasher level in 3 -4 lines in array format, With summery and experience_level Field in JSON Format with summaries as the key for array"
const Summary = ({ enabledNext }: { enabledNext: React.Dispatch<boolean> }) => {
  const { resumeInfo, setResumeInfo } = useResumeInfo()
  const [loading,setLoading]=useState(false);
  const params = useParams();
  const resumeId = params.id
  const [aiGeneratedSummaryList, setAiGenerateSummaryList] = useState<AISummary[]>([]);


  const handleChangeSummary = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    enabledNext(false)
    const { value } = e.target;
    setResumeInfo((prev: IResumeInfo|undefined) => { return { ...prev, summary: value } as IResumeInfo })
  }

  const GenerateSummeryFromAI=async()=>{
    setLoading(true)
    const PROMPT=prompt.replace('{jobTitle}',resumeInfo?.jobTitle as string );
    console.log(PROMPT);
    const result = await AIChatSession.sendMessage(PROMPT);
    const responseText = await result.response.text();

    console.log("Raw AI Response:", responseText);
    let parsedData;
    try {
      parsedData = JSON.parse(responseText);
    console.log("parsed :", parsedData);
      
    } catch (parseError) {
        console.error("Error parsing AI response:", parseError);
        setAiGenerateSummaryList([]); // Reset to empty array to avoid errors
        setLoading(false);
        return;
    }
   
    setAiGenerateSummaryList(parsedData.summaries)
    setLoading(false);
}

  const onSave= async(e:any)=>{
    e.preventDefault();
    
    try {
    setLoading(true)
    
      const response = await API.put('/update-resume', { data: { summary:resumeInfo?.summary } , resumeId }, {
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
    setLoading(false)
  }


  return (
    <div>
    <div className='p-5 shadow-lg rounded-lg border-t-accent-1 border-t-4 mt-10 bg-accent-2/60'>
   <h2 className='font-bold text-lg'>Summery</h2>
   <p>Add Summery for your job title</p>

   <form className='mt-7' onSubmit={onSave}>
       <div className='flex justify-between items-end'>
           <label>Add Summery</label>
           <Button  
           type="button" size="sm" className="border border-accent-1 bottom-2  text-white  flex gap-2" onClick={()=>GenerateSummeryFromAI()}> 
           <Brain className='h-4 w-4' />  Generate from AI</Button>
       </div>
       <Textarea className="mt-5 h-[20vh] resize-none " required
       
           value={resumeInfo?.summary}
       onChange={handleChangeSummary}
       />
       <div className='mt-2 flex justify-end'>
       <Button type="submit"
           disabled={loading} className='bg-primary-1 hover:bg-primary-1'>
               {loading?<LoaderCircle className='animate-spin' />:'Save'}
               </Button>
       </div>
   </form>
   </div>

   
  {aiGeneratedSummaryList?.length>0 && <div className='my-5'>
       <h2 className='font-bold text-lg'>Suggestions</h2>
       {aiGeneratedSummaryList?.map((item,index)=>(
           <div key={index} 
           onClick={() => {
             setResumeInfo((prev: IResumeInfo | undefined) => { return { ...prev, summary: item?.summary } as IResumeInfo })
           }}
           className='p-5 shadow-lg my-4 rounded-lg cursor-pointer bg-accent-2/70'>
               <h2 className='font-bold my-1 text-white'>Level: {item?.experience_level}</h2>
               <p className='text-gray-300'>{item?.summary}</p>
           </div>
       ))}
   </div>}

</div>
  )
}

export default Summary