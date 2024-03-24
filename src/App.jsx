import React, { useState, useEffect } from 'react'

export default function App() {
  const [ puerta, setPuerta ] = useState(true)
  const [ tokenGoogle, setToken ] = useState('AIzaSyB1MVbOUfEDFKD9wRpcxz9wvY4pKtjciV0')
  const [ admin, setAdmin ] = useState(false)
  const [ coordenadas, setCoordenadas ] = useState(null)
  const [ nombre, setNombre ] = useState('')
  const [ msj, setMsj ] = useState('')
  const [ conversation, setConversation ] = useState('')
  const chatSocket = new WebSocket('ws://localhost:8000/ws/chat/entrada/')

  const Captura_nombre = (e)=>{
    setNombre(e.value)
  }
  const login = () =>{
    setPuerta(false)
    nombre === 'true' ? setAdmin(true) : setAdmin(false)
  }
  const actualizarMsj = (e) => {
    setMsj(e.value)
  }

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

  const enviar = async(e) =>{
    e.preventDefault();
    const location = await capturarUbicacion();
    setCoordenadas(location);
    await chatSocket.send(JSON.stringify({
      type: 'message',
      coordenadas: location
    }));
    setMsj('');
  }
  
  useEffect(() => {
    const intervalId = setInterval(async () => {
      const location = await capturarUbicacion();
      setCoordenadas(location);
      await chatSocket.send(JSON.stringify({
        type: 'message',
        coordenadas: location
      }));
      if(coordenadas){
        setConversation(conversation + '\n' + coordenadas );
      }
    }, 5000); // Enviar las coordenadas cada 5 segundos
  
    return () => {
      clearInterval(intervalId); // Limpiar el intervalo cuando el componente se desmonte
    };
  }, [chatSocket]);
  

  return (
    <>
      <div style={{paddingLeft:'60px'}}>
        {/* valor de puerta : {puerta} */}
        {puerta && (
          <>
            <div>Esta es la sala de entrada</div>
            <label>Nombre</label>
            <input onChange={(e)=> Captura_nombre(e.target)} type="text"/>
            <button onClick={()=>{login()}}>Entrar</button>
          </>
        )}
        {!puerta && (
          admin ? (
            <>
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
            </>
          ) : (
            <>
              <h1>Bienvenido al chat {nombre}</h1>
              <div style={{display: 'flex', flexDirection: 'column-reverse'}}>
                <div id='BodyChat' style={{borderRadius:'24px', height:'400px', width:'300px', border:'1px solid black', whiteSpace: 'pre-wrap'}}>
                  {conversation}
                </div>
              </div>
              <input type="text" value={msj} onChange={(e)=>actualizarMsj(e.target)}/>
              <button onClick={(e)=>{enviar(e)}}>Enviar</button>
            </>
          )
        )}
      </div>
    </>
  )
}