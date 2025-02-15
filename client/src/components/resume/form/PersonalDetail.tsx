import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useResumeInfo } from '@/context/ResumeInfoProvider'
import { LoaderCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

interface IformData{
  firstName: string | undefined;
  lastName: string | undefined;
  jobTitle: string | undefined;
  address: string | undefined;
  phone: string | undefined;
  email: string | undefined;
  themeColor: string | undefined;
}

const PersonalDetail = ({enabledNext}:{enabledNext:React.Dispatch<boolean>}) => {
  const params=useParams();
  const { resumeInfo, setResumeInfo } = useResumeInfo()
  const [formData, setFormData] = useState<IformData>({
    firstName: "",
    lastName: "",
    jobTitle: "",
    address: "",
    phone: "",
    email: "",
    themeColor: "",
  });
const [loading,setLoading] = useState(false)
  
 
  
  console.log("---",resumeInfo)





  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    enabledNext(false)
    const { name, value } = e.target;

    setFormData((prev ) => ({
      ...prev,
      [name]: value
  }));

  
    
    setResumeInfo((prev: IResumeInfo|undefined) => { return { ...prev, [name]: value } as IResumeInfo })
    
}

const onSave=(e:any)=>{
    e.preventDefault();
    setLoading(true)
    const data={
        data:formData
    }
    // GlobalApi.UpdateResumeDetail(params?.resumeId,data).then(resp=>{
    //     console.log(resp);
    //     enabledNext(true);
    //     setLoading(false);
    //     toast("Details updated")
    // },(error)=>{
    //     setLoading(false);
    // })
    setLoading(false)
  }
  
    
  return (
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
    <h2 className='font-bold text-lg'>Personal Detail</h2>
    <p>Get Started with the basic information</p>

    <form onSubmit={onSave}>
        <div className='grid grid-cols-2 mt-5 gap-3'>
            <div>
                <label className='text-sm'>First Name</label>
                <Input name="firstName" defaultValue={resumeInfo?.firstName} required onChange={handleInputChange}  />
            </div>
            <div>
                <label className='text-sm'>Last Name</label>
                <Input name="lastName" required onChange={handleInputChange} 
                defaultValue={resumeInfo?.lastName} />
            </div>
            <div className='col-span-2'>
                <label className='text-sm'>Job Title</label>
                <Input name="jobTitle" required 
                defaultValue={resumeInfo?.jobTitle}
                onChange={handleInputChange}  />
            </div>
            <div className='col-span-2'>
                <label className='text-sm'>Address</label>
                <Input name="address" required 
                defaultValue={resumeInfo?.address}
                onChange={handleInputChange}  />
            </div>
            <div>
                <label className='text-sm'>Phone</label>
                <Input name="phone" required 
                defaultValue={resumeInfo?.phone}
                onChange={handleInputChange}  />
            </div>
            <div>
                <label className='text-sm'>Email</label>
                <Input name="email" required 
                defaultValue={resumeInfo?.email}
                onChange={handleInputChange}  />
            </div>
        </div>
        <div className='mt-3 flex justify-end'>
            <Button type="submit"
            disabled={loading}>
                {loading?<LoaderCircle className='animate-spin' />:'Save'}
                </Button>
        </div>
    </form>
</div>
  )
}

export default PersonalDetail