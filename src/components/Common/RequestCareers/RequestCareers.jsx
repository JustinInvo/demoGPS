import React, { useState, useEffect } from 'react'
import { useTables } from "../../../services/hooks"
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../../services/hooks"
import "./RequestCareers.scss"
export function RequestCareers() {
  const navigate = useNavigate();
  const { auth } = useAuth()
  const [ requestCareers, setRequestCareers ] = useState([])
  const { getRequestTable, loading } = useTables();

  useEffect(() => {
    const fetchTable = async () => {
      const response = await getRequestTable()
      setRequestCareers(response)
      // console.log('orders--->', response)
    };

    fetchTable();
  }, [])

  const goCareer = (id)=>{
    console.log('auth--->', auth)
    // navigate(auth.is_staff ? 'admin/tables' : 'driver/tables')
    navigate(`/${auth.me.is_staff ? 'admin' : 'driver'}/tables/${id}`)
  }

  return (
    <>
      {loading ? (
        <div>Cargando....</div>
      ): (
        <div className='container'>
          {requestCareers.map((career) => (
            <div key={career.id} className='container__card'>
              Origen: {career.origen} <br />
              Destino:{career.destino} <br />
              Driver: {career.driver} <br />
              Fecha y Hora: {career.fecha_hora} <br />
              Estado: {career.status_display}
              <button onClick={()=> goCareer(career.id)}>
                Iniciar carrera
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
