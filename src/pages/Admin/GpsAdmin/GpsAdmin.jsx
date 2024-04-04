import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"

export function GpsAdmin() {
  const [ tokenGoogle, setTokenGoogle ] = useState(import.meta.env.VITE_TOKEN_GOOGLE_MAPS)
  const [ baseApiSocket, setBaseApiSocket ] = useState(import.meta.env.VITE_BASE_SOCKET)
  const [coordenadas, setCoordenadas] = useState(null);
  const { career } = useParams()
  // Crea una nueva conexión WebSocket
  const chatSocket = new WebSocket(`${baseApiSocket}/ws/chat/${career}/`);
  useEffect(() => {
    chatSocket.onopen = () => {
      console.log('conectado el websocket ----->', career)
    }
    // Configura el manejador de eventos para los mensajes entrantes
    chatSocket.onmessage = (event) => {
      console.log('event-->', event.data)
      const data = JSON.parse(event.data);
      setCoordenadas(data.coordenadas);
      // if (data.type === 'message') {
      //   setCoordenadas(data.coordenadas);
      // }
    };

    // Cierra la conexión cuando el componente se desmonte
    return () => {
      // chatSocket.close();
    };
  }, []);
  return (
    <div>
      <h1>Bienvenido a la sección de administración</h1>
      Coordenadas - Latitud: {coordenadas?.lat}, Longitud: {coordenadas?.lng} <br />
      {coordenadas && (
        <iframe
          width="800px"
          height="600px"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps/embed/v1/place?key=${tokenGoogle}&q=${coordenadas.lat},${coordenadas.lng}&zoom=18`}
        >
        </iframe>
      )}
    </div>
  )
}
