import React, { useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

enum CallStatus {
    INACTIVE = "INACTIVE",
    CONNECTING = "CONNECTING",
    ACTIVE = "ACTIVE",
    FINISHED = "FINISHED",
}
  

const Agent = ({
  userName,
  userId,
  type,
}: {
  userName: string;
  userId: string;
  type: string;
}) => {
    const [isSpeaking, setIsSpeaking] = useState(true);
    const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
    const messages = ['what is your name?', 'My name is John Doe,nice to meet you!']
    const lastMessage = messages[messages.length - 1];
  return (
    <>
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
          {
              messages.length > 0 && <div className="transcript-border">
                  <div className="transcript">
                      <p className={cn('transition-opacity duration-500 opacity-0','animate-fadeIn opacity-100')}>
                          {lastMessage}
                      </p>
                      
                  </div>
              </div>
          }
          <div className="w-full flex justify-center">
              {callStatus !== CallStatus.ACTIVE ? (
                 <button className="relative flex justify-center items-center btn-call " onClick={() => handleCall()}>
                 <span
                   className={cn(
                     "absolute bg-[#49de50] h-[85%] w-[65%] animate-ping  rounded-full opacity-75",
                     callStatus !== CallStatus.CONNECTING && "hidden"
                   )}
                 />
     
                 <span className="relative">
                   {callStatus === CallStatus.INACTIVE || callStatus === CallStatus.FINISHED
                     ? "Call"
                     : ". . ."}
                 </span>
               </button>
              ):(
                <button className="btn-disconnect" onClick={() => handleDisconnect()}>
                  End
                </button>
              )}
          </div>
    </>
  );
};

export default Agent;
