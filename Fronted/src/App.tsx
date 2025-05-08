// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import './style/Login.css'
// import { RouterProvider } from 'react-router'

// import Login from './features/auth/SignUp'

// function App() {
//   return (
//     <>
//       <RouterProvider router={router}/>
//     </>
//   )
// }

// export default App
// import { RouterProvider } from 'react-router'
import './App.css'
import {  useCookies } from 'react-cookie'
import { Provider } from 'react-redux'
import router from './app/router'
import LandingPage from './app/pages/LandingPage'
import { store } from './app/store'
import { RouterProvider } from 'react-router-dom'


function App() {
  const [cookies] = useCookies(['token'])
  return (
    <>
      <Provider store={store}>
        {cookies.token?
        <RouterProvider router={router}/>
          :<LandingPage/>}
      </Provider>

    </>
  )
}

export default App