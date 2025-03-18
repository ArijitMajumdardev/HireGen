import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import API from "@/lib/ServerAPI";
import { cn } from "@/lib/utils";
import { IResumeList } from "@/pages/Dashboard";
import { EllipsisVertical } from "lucide-react";
import { SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const DropDownResumeCard = ({ className,setResumeList,resume,index }: { className: string,setResumeList:React.Dispatch<SetStateAction<IResumeList[]>>,resume:IResumeList ,index:number}) => {
  const [loading,setLoading] = useState(false)
  const handleResumeDelete = async ()=>{
    try {
      setLoading(true);

      const response = await API.delete(
        `/delete-resume/${resume.id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setLoading(false);
      if (response.status == 200) {
        setResumeList((prev) => {
          return prev.filter((res)=> res.id !=resume.id)
        })
        toast.success(response.data.message);
        
      }
    } catch (error: any) {
      console.log("sdd", error?.response.data);
      setLoading(false);
      toast.error(error.response.data);
    }
  }
  return (
    <div className={cn(className)}>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <EllipsisVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
        <Link to={`/resume/${resume.id}/edit`} >
          <DropdownMenuItem className="cursor-pointer">
            Edit
            </DropdownMenuItem>
          </Link>
          <Link to={`/my-resume/${resume.id}/view`}>
          <DropdownMenuItem className="cursor-pointer">
           View
          </DropdownMenuItem>
          </Link>
          <Link to={`/my-resume/${resume.id}/view`}>
          <DropdownMenuItem className="cursor-pointer">
            Download
            </DropdownMenuItem>
            </Link>
          <DropdownMenuItem onClick={handleResumeDelete} className="cursor-pointer">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DropDownResumeCard;
