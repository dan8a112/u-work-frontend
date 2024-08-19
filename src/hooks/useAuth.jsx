import {createContext, useContext, useState } from "react"

const AuthContext = createContext();

export const useAuth = () =>{
    const auth = useContext(AuthContext)
    return auth;
}

export const AuthProvider = ({children}) =>{
    const [isAuthenticated, setIsAuthenticated] = useState({
        applicant: false,
        enterprise: false,
        admin: false
    });

    const loginApplicant = ()=>{
        const idApplicant = localStorage.getItem('idPersonaSoli');
        if(idApplicant){
            setIsAuthenticated({... isAuthenticated, applicant: true});
        }
    }

    const loginEnterprise = ()=>{
        const idEnterprise = localStorage.getItem('idEmpresa');
        if(idEnterprise){
            setIsAuthenticated({... isAuthenticated, enterprise: true});
        }
    }

    const loginAdmin = ()=>{
        const idAdmin = localStorage.getItem('idAdmin');
        if(idAdmin){
            setIsAuthenticated({... isAuthenticated, admin: true});
        }
    }

    const logout = ()=>{
        localStorage.removeItem('idPersonaSoli');
        localStorage.removeItem('idEmpresa');
        localStorage.removeItem('idAdmin');
        setIsAuthenticated(false);
    }

    return(
        <AuthContext.Provider value={{isAuthenticated, loginApplicant, loginEnterprise, loginAdmin, logout}}>
            {children}
        </AuthContext.Provider>
    );
}