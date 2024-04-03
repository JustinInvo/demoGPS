import React, { useState } from 'react'
import { loginApi } from "../services/api/user"
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../services/hooks"

export function Login() {
    const { login } = useAuth()
    const navigate = useNavigate();
    
    const [form, setForm] = useState({
      email:"",
      password:"",
    })

    const handleChange = (e) => {
      setForm({
        ...form,
        [e.target.name]: e.target.value
      })
    }

    const gologin = async()=> {
      try {
        console.log('form---->', form)
        const response = await loginApi(form)
        console.log('response-->', response)
        const { access } = response;
        const { is_staff } = await login(access)
        navigate(is_staff ? 'admin' : 'driver')
      } catch(error) {
        console.log(error)
      }
    }

  return (
    <div>
        Ingresa tus datos para logearte <br />
        <label>Email:</label>
        <input type="text" onChange={handleChange} name='email'/> <br />
        <label>Password:</label>
        <input type="password" onChange={handleChange} name='password'/> <br />
        {/* <label>Sala:</label>
        <input type="number" onChange={(e)=>setHall(e.target.value)}/> <br /> */}
        <button onClick={()=> gologin()}>
            Entrar
        </button>
    </div>
  )
}
