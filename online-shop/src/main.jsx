import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { router } from './routers/router.jsx'
import AuthProvider from './contexts/AuthProvider.jsx'
import { RouterProvider } from 'react-router'
import { ToastContainer } from 'react-toastify'
import "./i18n"; // 👈 import i18n setup



createRoot(document.getElementById('root')).render(
  <StrictMode>
    
      <AuthProvider>
        <RouterProvider router={router} />
         <ToastContainer position="top-center" autoClose={3000}  />
      </AuthProvider>


      
  </StrictMode>,
)
