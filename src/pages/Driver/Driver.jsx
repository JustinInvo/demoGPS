import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"

export function Driver() {
  const { hall } = useParams()
  const chatSocket = new WebSocket(`ws://localhost:8000/ws/chat/${hall}/`);
  
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
