import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useResumeInfo } from '@/context/ResumeInfoProvider'
import API from '@/lib/ServerAPI';
import { LoaderCircle } from 'lucide-react';
import React, {  useState } from 'react'
import toast from 'react-hot-toast';

interface IformData{
  firstName: string | undefined;
  lastName: string | undefined;
  jobTitle: string | undefined;
  address: string | undefined;
  phone: string | undefined;
  email: string | undefined;
  themeColor: string | undefined;
}

const PersonalDetail = ({enabledNext,resumeId}:{enabledNext:React.Dispatch<boolean>,resumeId:string}) => {
  const { resumeInfo, setResumeInfo } = useResumeInfo()
  const [formData, setFormData] = useState<IformData>({
    firstName: resumeInfo?.firstName,
    lastName: resumeInfo?.lastName,
    jobTitle: resumeInfo?.jobTitle,
    address: resumeInfo?.address,
    phone: resumeInfo?.phone,
    email: resumeInfo?.email,
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

const onSave= async(e:any)=>{
    e.preventDefault();
    
    try {
    setLoading(true)
    
    const response = await API.put('/update-resume', { data : formData, resumeId }, {
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
    <div className='p-5 shadow-lg rounded-lg border-t-accent-1 border-t-4 mt-10 bg-accent-2/60'>
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
                <Input name="lastName"  onChange={handleInputChange} 
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
            <Button type="submit" className='bg-primary-1 hover:bg-primary-1'
            disabled={loading}>
                {loading?<LoaderCircle className='animate-spin' />:'Save'}
                </Button>
        </div>
    </form>
</div>
  )
}

export default PersonalDetail