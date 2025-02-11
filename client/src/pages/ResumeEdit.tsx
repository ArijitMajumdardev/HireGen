import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const ResumeEdit = () => {
    const param = useParams()

    useEffect(() => {
       console.log(param) 
    },[])
  return (
    <div>ResumeEdit</div>
  )
}

export default ResumeEdit