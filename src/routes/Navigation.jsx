import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import routesClient from "./routes"

export function Navigation() {
  return (
    <BrowserRouter>
      <Routes>
        {routesClient.map((route, index)=> (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            element={
              <route.layout>
                <route.component/>
              </route.layout>
            }
            />
          ))}
          {/* Esta línea manejará las rutas no encontradas */}
      </Routes>
    </BrowserRouter>
  )
}