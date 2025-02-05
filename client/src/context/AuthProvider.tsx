import React, { createContext, ReactNode, useContext, useState } from "react";


interface IAuthContextType{
    user: { id: string; name: string } | null;
    openAuthDialog: boolean,
    setOpenAuthDialog : React.Dispatch<boolean>
}


const AuthContext = createContext<IAuthContextType | undefined>(undefined);


const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<{ id: string; name: string } | null>(null);
    const [openAuthDialog, setOpenAuthDialog] = useState<boolean>(false);
    
    return (
        <AuthContext.Provider value={{user,openAuthDialog,setOpenAuthDialog}}>
            {children}
    </AuthContext.Provider>
    )
}


 const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
  };


export {AuthProvider,useAuthContext}