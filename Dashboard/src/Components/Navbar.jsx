import axios from 'axios'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { NavLink } from 'react-router-dom'

function Navbar() {
 
  return (
    <div className='h-17 sticky bg-[#1ca3d9]  w-full flex justify-around items-center '>
      <div className="logo"><img src="/logo.png" className='h-20 w-20' alt="" /></div>
      <div className="nav-NavLinks flex justify-center items-center">
        <ul className='flex justify-center items-center gap-5 font-medium text-white'>
          <li><NavLink className={({ isActive }) =>isActive ? 'bg-blue-600 rounded-full text-white px-3 py-1' : 'px-3 py-1'} to="/" >Home</NavLink></li>
          <li><NavLink className={({ isActive }) =>isActive ? 'bg-blue-600 rounded-full text-white px-3 py-1' : 'px-3 py-1'} to="/appointment">Appointments</NavLink></li>
          <li><NavLink className={({ isActive }) =>isActive ? 'bg-blue-600 rounded-full text-white px-3 py-1' : 'px-3 py-1'} to="/doctor">Doctors</NavLink></li>
          <li><NavLink className={({ isActive }) =>isActive ? 'bg-blue-600 rounded-full text-white px-3 py-1' : 'px-3 py-1'} to="/message">Messages</NavLink></li>
          <li><NavLink className={({ isActive }) =>isActive ? 'bg-blue-600 rounded-full text-white px-3 py-1' : 'px-3 py-1'} to="/admin">Admin</NavLink></li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar