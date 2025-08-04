import React from 'react'
import { Link } from 'react-router-dom'
import { FaGithub, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { FaXTwitter } from 'react-icons/fa6';

function Footer() {
  return (
    <div className='border-t-2 z-10 footer gap-3 border-black h-full md:h-30 flex pb-2 pt-2 justify-around items-center text-xs'>
        <div className="logo hidden md:block  justify-center items-center"><img src="/logo.png" className='h-25 w-28' alt="" /></div>
        <div className="footer-links hidden md:block">
            <ul className='flex justify-center items-center flex-col text-xs md:text-[16px]'>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="contact">Contact</Link></li>
                <li><Link to="/appointment">Appointments</Link></li>
            </ul>
        </div>
        <div className="timings flex flex-col justify-center items-center">
            <ul>
                <li className='flex justify-center items-center gap-4'><h3 className='font-normal'>Monday</h3><p className=' text-[13px]'>  8:00 am to 6:00 pm</p></li>
                <li className='flex justify-center items-center gap-4'><h3 className='font-normal'>Monday</h3><p className=' text-[13px]'>  8:00 am to 6:00 pm</p></li>
                <li className='flex justify-center items-center gap-4'><h3 className='font-normal'>Monday</h3><p className=' text-[13px]'>  8:00 am to 6:00 pm</p></li>
                <li className='flex justify-center items-center gap-4'><h3 className='font-normal'>Monday</h3><p className=' text-[13px]'>  8:00 am to 6:00 pm</p></li>
                <li className='flex justify-center items-center gap-4'><h3 className='font-normal'>Monday</h3><p className=' text-[13px]'>  8:00 am to 6:00 pm</p></li>
            </ul>
        </div>
        <div className="author place-self-center flex flex-col text-[15px] text-blue-700">
            <h1 className='font-semibold text-black'>Ehaab Syed</h1>
            <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/authwall?trk=bf&trkInfo=AQFgBvRQCgIgUAAAAZhV5NGgmxFrd1DoZyMaAng4ekDNqPPJZYQSqvnEqaqhQERUjOELOxUupqXa3CtlLPP5fW4FohcpI7o3EyK_sGC1ywLe9MngUsZG_OjKB0nvVeU2qsneUew=&original_referer=&sessionRedirect=https%3A%2F%2Fwww.linkedin.com%2Fin%2Fsyed-ehaab-8b8a49308%3Futm_source%3Dshare%26utm_campaign%3Dshare_via%26utm_content%3Dprofile%26utm_medium%3Dandroid_app" className='flex justify-start items-center gap-2'>Linked In <FaLinkedinIn /></a>
            <a target="_blank" rel="noopener noreferrer" href="https://github.com/Ehaabsyed" className='flex justify-start items-center gap-2'>Git Hub <FaGithub/></a>
            <a target="_blank" rel="noopener noreferrer" href="https://x.com/ehbsyd12?t=uxz8OdR1SgOobwtrvXsblg&s=09" className='flex justify-start items-center gap-2'>Twitter <FaXTwitter /></a>
            <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/_ehaab_syedd?igsh=MWNmeDhvbzN1YXg1Zw%3D%3D" className='flex justify-start items-center gap-2'>Instagram <FaInstagram/></a>
        </div>
        
    </div>
  )
}

export default Footer