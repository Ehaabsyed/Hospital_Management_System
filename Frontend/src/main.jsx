import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import Navbar from './components/Navbar.jsx'
import Home from './Pages/Home.jsx'
import About from './Pages/About.jsx'
import Contact from './Pages/Contact.jsx'
import Appointment from './Pages/Appointment.jsx'
import Login from './Pages/Login.jsx'
import Register from './Pages/Register.jsx'
import Footer from './components/Footer.jsx'
import ForgotPass from './Pages/ForgotPass.jsx'
import ResetPass from './Pages/ResetPass.jsx'
import Diff from './Pages/Diff.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <><Navbar /><Home /><Footer/></>
  },
  {
    path: "/about",
    element: <><Navbar /><About/></>
  },
  {
    path: "/contact",
    element: <><Navbar /><Contact /><Footer/></>
  },
  {
    path: "/appointment",
    element: <><Navbar /><Appointment /><Footer/></>
  },
  {
    path: "/login",
    element: <Login/>
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
    path: "/register",
    element: <Register/>
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
