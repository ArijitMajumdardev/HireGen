import React, { useEffect, useState } from 'react'
import PersonalDetail from './form/PersonalDetail'
import { Link, Navigate, useParams } from 'react-router-dom';
import { Button } from '../ui/button';
import Home from '@/pages/Home';
import { ArrowLeft, ArrowRight, LayoutGrid } from 'lucide-react';
import Summary from './form/Summary';
import Experience from './form/Experience';
import Education from './form/Education';
import Skills from './form/Skills';
import dummy from '@/Data/dummy';
import API from '@/lib/ServerAPI';

const ResumeForm = ({resumeId}:{resumeId:string}) => {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext,setEnableNext]=useState(true);

 
  

  return (
    <div>
      <div className='flex justify-between'>
            {/* <Link to={"/dashboard"}>
          </Link> */}
        <Button variant={'ghost'}>
          <LayoutGrid/>
          Themes
          </Button>
         
          <div className='flex gap-2'>
            {activeFormIndex>1
            &&<Button size="sm" 
            onClick={()=>setActiveFormIndex(activeFormIndex-1)}> <ArrowLeft/> </Button> }
            <Button 
            disabled={!enableNext}
            className="flex gap-2" size="sm"
            onClick={()=>setActiveFormIndex(activeFormIndex+1)}
            > Next 
            <ArrowRight/> </Button>
        </div>
        
        </div>

        {activeFormIndex==1?  
        <PersonalDetail enabledNext={(v)=>setEnableNext(v)} resumeId={resumeId} />
        :activeFormIndex==2?
              <Summary  enabledNext={(v)=>setEnableNext(v)} />
        :activeFormIndex==3?
          <Experience enabledNext={(v)=>setEnableNext(v)}  resumeId={resumeId}/>  
          :activeFormIndex==4?
          <Education/>
          :activeFormIndex==5?
          <Skills/>
          :activeFormIndex==6?
                  <Navigate to={'/my-resume/' + resumeId +"/view"}/>
              
        :null
          }
    </div>
  )
}

export default ResumeForm