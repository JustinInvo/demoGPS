import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"

export function GpsDriver() {
  const [ baseApiSocket, setBaseApiSocket ] = useState(import.meta.env.VITE_BASE_SOCKET)
  const { career } = useParams()
  const chatSocket = new WebSocket(`${baseApiSocket}/ws/chat/${career}/`);
  
  const capturarUbicacion = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(({coords : {latitude, longitude} }) => {
        resolve({
          lat: latitude,
          lng: longitude
        });
      }, reject, { enableHighAccuracy: true , timeout: 1500});
    });
  }
  useEffect(() => {
    const intervalId = setInterval(async () => {
      const location = await capturarUbicacion();
      await chatSocket.send(JSON.stringify({
        type: 'message',
        coordenadas: location
      }));
      console.log('location--->', location)
    }, 5000); // Enviar las coordenadas cada 5 segundos
  
    return () => {
      clearInterval(intervalId); // Limpiar el intervalo cuando el componente se desmonte
    };
  }, [chatSocket]);

  return (
    <div>
      <h1>Bienvenido al chat</h1>
      <p>Enviando ubicación</p>
    </div>
  )
}
