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
  

const CreateResumeDialog = ({ openDialog, setOpenDialog }: { openDialog: boolean, setOpenDialog: React.Dispatch<boolean> }) => {
    const [resumeTitle, setResumeTitle] = useState('')

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
        <Button disabled={!resumeTitle}>Create</Button>                  
        </div>
    </DialogHeader>
  </DialogContent>
</Dialog>

    </>
  )
}

export default CreateResumeDialog