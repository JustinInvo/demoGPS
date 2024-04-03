import { useState } from "react"
// import { getCategoriesApi, } from "../api/gps"

export function useCategory() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

//   const getCategories = async () => {
//     try{
//       setLoading(true);
//       const response = await getCategoriesApi();
//       setCategories(response)
//     }catch(error){
//       setError(error)
//     }finally{
//       setLoading(false);
//     }
//   }

  return {
    loading,
    error,
  }
}