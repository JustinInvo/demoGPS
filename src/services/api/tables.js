import { BASE_API } from "../../utils/constans"

export async function getCareerRequests(token, idUser){
  try{
    const idUserFilter = `driver=${idUser}`

    const url = `${BASE_API}/api/carreras/?${idUserFilter}`
    const params = {
      headers: {
        Authorization: `Bearer ${token}`
      },
    }
    const response = await fetch(url, params)
    const result = await response.json()
    return result
  }catch(error){
    throw error;
  }
}