import { useState } from "react"
import { getCareerRequests } from "../api/tables"
import { useAuth } from "./"

export function useTables(){
  const { auth } = useAuth()
  const [ error, setError ] = useState(null)
  const [ loading, setLoading ] = useState(true)
  // const [ requestTable, setRequestTable ] = useState(null)

  const getRequestTable = async() =>{
    try{
      setLoading(true)
      return await getCareerRequests(auth.token,auth.id)
      // setRequestTable(response)
    }catch(error){
      setError(error)
    }finally{
      setLoading(false)
    }
  }
  
  return{
    error,
    loading,
    // requestTable,
    getRequestTable
  }
}