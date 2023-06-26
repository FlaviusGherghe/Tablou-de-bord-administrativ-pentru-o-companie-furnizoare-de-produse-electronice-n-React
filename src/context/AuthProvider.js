import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, steAuth] = useState({});

    return(
        <AuthContext.Provider value ={{auth, steAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;