import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className='min-h-screen w-full gradient flex flex-col md:flex-row justify-center items-center px-4 py-10 gap-10'>

      {/* Left image */}
      <div className="left w-full md:w-1/2 flex justify-center">
        <img src="/home-doc.png" className='w-full max-w-[500px] h-auto object-contain' alt="Doctor Illustration" />
      </div>

      {/* Right text and buttons */}
      <div className="right w-full md:w-1/2 flex flex-col text-white">
        <h1 className='text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight'>
          Welcome to MediNest — Your Health, Our Priority
        </h1>

        <h2 className='text-xl md:text-2xl lg:text-3xl font-semibold mt-5 text-[#004966]'>
          Book appointments, manage medical records, and connect with trusted doctors – all in one place.
        </h2>

        <h3 className='text-base md:text-lg mt-4 text-[#004966]'>
          Get started – Register to book your appointment now.
        </h3>

        <div className="buttons flex  sm:flex-row gap-4 mt-6">
          <Link to="/register">
            <button className='bg-blue-600 hover:scale-[1.05] transition px-6 py-2 rounded-full text-white font-bold'>
              Register
            </button>
          </Link>
          <Link to="/appointment">
            <button className='bg-blue-600 hover:scale-[1.05] transition px-6 py-2 rounded-full text-white font-bold'>
              Get Appointment
            </button>
          </Link>
        </div>
      </div>

    </div>
  )
}

export default Home
