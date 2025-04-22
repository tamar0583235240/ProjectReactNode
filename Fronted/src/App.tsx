import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './style/Login.css'
import { RouterProvider } from 'react-router'
import router from './app/router'
import Login from './features/auth/SignUp'

function App() {
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
