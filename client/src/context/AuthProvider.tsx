import React, { createContext, ReactNode, useContext, useState } from "react";


interface IAuthContextType{
    user: { email: string; name: string,id:string } | null;
    setUser:React.Dispatch<{email: string; name: string,id: string}>
    openAuthDialog: boolean
    setOpenAuthDialog: React.Dispatch<boolean>
    isLogged: boolean
    setIsLogged : React.Dispatch<boolean>
}


const AuthContext = createContext<IAuthContextType | undefined>(undefined);


const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ email: string; name: string;id: string } | null>(null);
    const [openAuthDialog, setOpenAuthDialog] = useState<boolean>(false);
    const [isLogged,setIsLogged] = useState(false)
    
    return (
        <AuthContext.Provider value={{user,setUser,openAuthDialog,setOpenAuthDialog,isLogged,setIsLogged}}>
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