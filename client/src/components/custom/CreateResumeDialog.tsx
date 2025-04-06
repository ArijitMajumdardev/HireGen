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
    <Dialog open={openDialog} onOpenChange={closeResumeDialog}>
    <DialogContent className="bg-[#262433] border border-gray-700 text-white rounded-2xl shadow-xl">
      <DialogHeader>
        <DialogTitle className="text-xl text-white font-bold">
          Create New Resume
        </DialogTitle>
        <DialogDescription className="text-sm text-gray-300 mt-1">
          Add a title to your new resume
        </DialogDescription>
      </DialogHeader>

      <Input
        className="mt-4 bg-[#1F1D2B] border border-gray-600 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-[#777AF1]"
        placeholder="e.g., Fullstack Resume"
        value={resumeTitle}
        onChange={(e) => setResumeTitle(e.target.value)}
      />

      <div className="flex justify-end gap-2 mt-6">
        <Button
          // variant={"ghost"}
          onClick={closeResumeDialog}
          className="text-gray-300  hover:text-white"
        >
          Cancel
        </Button>
        <Button
          disabled={!resumeTitle}
          onClick={HandleCreateResume}
          className="bg-[#777AF1] text-white hover:bg-[#6c6fe1]"
        >
          Create
        </Button>
      </div>
    </DialogContent>
  </Dialog>
  )
}

export default CreateResumeDialog