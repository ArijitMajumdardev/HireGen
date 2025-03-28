import React, { useState } from 'react'

const Agent = ({ userName,userId,type}:{userName:string,userId:string,type:string}) => {
    const [isSpeaking, setIsSpeaking] = useState(true);
  return (
      <div className="call-view">
           <div className="card-interviewer">
          <div className="avatar">
            <img
              src="/ai-avatar.png"
              alt="profile-image"
              width={65}
              height={54}
              className="object-cover"
            />
            {isSpeaking && <span className="animate-speak animate-ping" />}
          </div>
          <h3>AI Interviewer</h3>
        </div>
           {/* User Profile Card */}
        <div className="card-border">
          <div className="card-content">
            <img
              src="/user-avatar.png"
              alt="profile-image"
              width={539}
              height={539}
              className="rounded-full object-cover size-[120px]"
            />
            <h3>{userName}</h3>
          </div>
        </div>
          
    </div>
  )
}

export default Agent