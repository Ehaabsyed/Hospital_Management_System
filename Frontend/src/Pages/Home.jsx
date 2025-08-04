import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className=' min-h-screen w-full gradient flex justify-center items-center'>
      <div className="left">
        <img src="/home-doc.png" className='w-[800px] h-full' alt="" />
      </div>
      <div className="right w-[1000px]h-fit flex flex-col text-white">
        <h1 className='text-7xl font-bold tracking-tight'>Welcome to MediNest — Your Health, Our Priority</h1>
        <h2 className='text-4xl font-semibold mt-5 text-[#004966]'>Book appointments, manage medical records, and connect with trusted doctors – all in one place.</h2>
        <h3 className='text-xl font-semibold mt-5 text-[#004966]'>Get started – Register to book your appointment now. </h3>

        <div className="buttons flex gap-5 mt-5">
          <Link to="/register"><button className='bg-blue-600 hover:scale-[1.1] px-6 py-2 rounded-full border-none font-bold cursor-pointer'>Register</button></Link>
          <Link to="/appointment"><button className='bg-blue-600 hover:scale-[1.1]  px-6 py-2 rounded-full border-none font-bold cursor-pointer'>Get Appointment</button></Link>
        </div>
      </div>

    </div>
  )
}

export default Home