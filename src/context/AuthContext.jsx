import React, { useState, useEffect, createContext } from "react";
import { setToken, getToken, removeToken } from "../services/api/token"
import { useUser } from "../services/hooks"

export const AuthContext = createContext({
  auth: undefined,
  login: () => null,
  logout: () => null,
});

export function AuthProvider(props) {
  const { children } = props;
  const [auth, setAuth] = useState(undefined)
  const { getMe } = useUser();
  useEffect(()=> {
    ( async ()=> {
      const token = getToken();
      if(token) {
        const me = await getMe(token)
        setAuth({token, me})
        console.log(me)
      }else {
        setAuth(null)
        // console.log('token vencidoooooooo')
      }
    })();
  }, [])

  const login = async (token) => {
    setToken(token)
    const me = await getMe(token)
    setAuth({token, me})
    console.log("me --->", me)
    return me
  }

  const logout = () => {
    if(auth) {
      removeToken()
      setAuth(null)
    }
  }

  const valueContext = {
    auth,
    login,
    logout
  }
  if(auth === undefined) return null;
  return(
    <AuthContext.Provider value={valueContext}>
      {children}
    </AuthContext.Provider>
  )
}