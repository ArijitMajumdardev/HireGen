import Agent from '@/components/VoiceAgent/Agent';
import { useAuthContext } from '@/context/AuthProvider';
import React from 'react'

const Interview = () => {
    const {user} = useAuthContext()
    return (
        <>
            <h3>Interview generation</h3>
            <Agent/>

            {/* <Agent
        userName={user?.name!}
        userId={user?.id}
        profileImage={user?.profileURL}
        type="generate"
      /> */}
    
        </>
      );
}

export default Interview