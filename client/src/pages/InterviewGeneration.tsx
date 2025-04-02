import Agent from '@/components/VoiceAgent/Agent';
import { useAuthContext } from '@/context/AuthProvider';
import React from 'react'

const InterviewGeneration = () => {
    const {user} = useAuthContext()
    return (
        <>
            <h3>Interview generation</h3>
          

            <Agent
        userName={user?.name!}
        userId={user?.id!}
        type="generate"
      />
    
        </>
      );
}

export default InterviewGeneration