import React, { useState } from 'react'

const Agent = () => {
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
          
          
    </div>
  )
}

export default Agent