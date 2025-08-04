import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './Components/Navbar.jsx'
import Home from './Pages/Home.jsx'
import Login from './Pages/Login.jsx'
import Diff from './Pages/Diff.jsx'
import Appointments from './Pages/Appointments.jsx'
import Doctor from './Pages/Doctor.jsx'
import Message from './Pages/Message.jsx'
import Admin from './Pages/Admin.jsx'
import ForgotPass from './Pages/ForgotPass.jsx'
import ResetPass from './Pages/ResetPass.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <><Navbar /><Home /></>
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/appointment",
    element: <><Navbar /><Appointments/></>
  },
  {
    path: "/doctor",
    element: <><Navbar /><Doctor/></>
  },
  {
    path: "/message",
    element: <><Navbar /><Message/></>
  },
  {
    path:"/forgot-password",
    element:<ForgotPass/>
  },
  {
    path:"/reset-password",
    element:<ResetPass/>
  },
  {
    path: "/admin",
    element: <><Navbar /><Admin/></>
  },
  {
    path: "*",
    element: <Diff/>
  },
  
])

createRoot(document.getElementById('root')).render(
  <>
    <RouterProvider router={router} />
    <Toaster />
  </>
)
