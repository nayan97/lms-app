import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { router } from './routers/router.jsx'
import { RouterProvider } from 'react-router'
import { ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')).render(
  <StrictMode>
       <RouterProvider router={router} />
       <ToastContainer position="top-center" autoClose={3000}  />
  </StrictMode>,
)
