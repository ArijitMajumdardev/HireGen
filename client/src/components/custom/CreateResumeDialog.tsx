import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
import React, { useState } from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import {v4 as uuid4} from 'uuid'
import API from "@/lib/ServerAPI"
import { useAuthContext } from "@/context/AuthProvider"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

const CreateResumeDialog = ({ openDialog, setOpenDialog }: { openDialog: boolean, setOpenDialog: React.Dispatch<boolean> }) => {
  const [resumeTitle, setResumeTitle] = useState('')
  const { user } = useAuthContext()
  const navigate = useNavigate()
  
  const HandleCreateResume = async () => {
    try {
      const uuid = uuid4();
      console.log(uuid, resumeTitle)
      const email = user?.email
      const res = await API.post('/create-resume',{uuid,resumeTitle,email},{
        headers: {
          "Content-Type":"application/json"
        }
      })
      console.log(res)
      if (res.status == 200) {
        closeResumeDialog()
        navigate("/resume/" + uuid+"/edit")
        toast.success(res.data.message)
      }
    } catch (error:any) {
      closeResumeDialog()
      toast.error("Somthing went Wrong")
    }
  }

    const closeResumeDialog = () => {
        setOpenDialog(false)
    }
  return (
      <>
          <Dialog open={openDialog} onOpenChange={closeResumeDialog}>
  {/* <DialogTrigger>Open</DialogTrigger> */}
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Create New Resume </DialogTitle>
      <DialogDescription>
        Add a title to your new resume
        <Input className="my-2" placeholder="Ex. Fullstack Resume" onChange={(e)=>setResumeTitle(e.target.value)} />   
      </DialogDescription>
        <div className="flex justify-end gap-2">
        <Button variant={"ghost"}  onClick={closeResumeDialog}>Cancel</Button>                  
        <Button disabled={!resumeTitle} onClick={HandleCreateResume}>Create</Button>                  
        </div>
    </DialogHeader>
  </DialogContent>
</Dialog>

    </>
  )
}

export default CreateResumeDialog