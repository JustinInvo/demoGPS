import React, { useState, useEffect } from 'react'
import { Navigation } from "./routes"
import { AuthProvider } from "./context"

export default function App() {
  return (
    <>
      <AuthProvider>
        <Navigation/>
      </AuthProvider>
    </>
  )
}