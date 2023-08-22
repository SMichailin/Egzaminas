import {useState, useEffect, createContext, useContext} from 'react'
import { Navigate } from 'react-router-dom';
import axios from "../axios";
const AuthContext = createContext(null)

export const AuthProvider = ({children}) => {
    let data = JSON.parse(localStorage.getItem("data")) || null;
    const [user, setUser] = useState(data);
    let token = localStorage.getItem("token") || null;

    const getInfo = async () => {
      if(token){        
        try {
        const res = await axios.get("/auth/me");
        const {username, role} = res.data.data;
        localStorage.setItem("data", JSON.stringify({username: username, role: role}));
        setUser(res.data.data);
      } catch (err) {
        console.log(err.response.data.mess);
        logout();
      }
    }else{
      logout();
    }
    }   
    useEffect(() =>  {
      getInfo();
      }, []);
        
    const login = (data) => {
        localStorage.setItem("token", data.token);
        const {username, role} = data;
        localStorage.setItem("data", JSON.stringify({username: username, role: role}));
        setUser(data);
    }
    
    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("data");
      }    
    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext);
}

export const RequireAuth = ({children}) => {
    const auth = useAuth();
    if(!auth.user){
        return <Navigate to='/login' replace/>
    }
    return children;
}
export const RequireAdmin = ({children}) => {
  const auth = useAuth();
  if(!auth.user || auth.user.role != 'admin'){
      return <Navigate to='/' replace/>
  }
  return children;
}

export const AuthorizedRedirect = ({children}) => {
  const auth = useAuth();
  if(auth.user){
      return <Navigate to='/' replace/>
  }
  return children;
}
