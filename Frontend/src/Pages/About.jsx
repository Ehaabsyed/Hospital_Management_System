import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Lenis from 'lenis'

const departments = [
  {
    image: "/depart/cardiology.jpg",
    title: "Cardiology",
    info: "Specializes in heart and blood vessel conditions."
  },
  {
    image: "/depart/neurology.jpg",
    title: "Neurology",
    info: "Deals with disorders of the brain, spine, and nerves."
  },
  {
    image: "/depart/gynecology.jpg",
    title: "Gynecology",
    info: "Focuses on women’s reproductive health and childbirth."
  },
  {
    image: "/depart/pediatrics.webp",
    title: "Pediatrics",
    info: "Provides medical care for infants, children, and adolescents."
  },
  {
    image: "/depart/orthopedics.jpg",
    title: "Orthopedics",
    info: "Treats bone, joint, and muscle issues."
  },
  {
    image: "/depart/dermatology.jpg",
    title: "Dermatology",
    info: "Diagnoses and treats skin, hair, and nail conditions."
  },

  {
    image: "/depart/ent.webp",
    title: "ENT",
    info: "Treats ear, nose, and throat conditions."
  },
  {
    image: "/depart/psychiatry.jpg",
    title: "Psychiatry",
    info: "Deals with mental health disorders and counseling."
  },
  {
    image: "/depart/urology.jpg",
    title: "Urology",
    info: "Treats urinary tract and male reproductive issues."
  },
  {
    image: "/depart/radiology.jpg",
    title: "Radiology",
    info: "Uses imaging to diagnose and treat diseases."
  },

];
function About() {



  const [doctors, setdoctors] = useState([])

  //get all doctors
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/doctor/getalldoctors`)
      .then(response => {
        setdoctors(response.data.doctors)

      })
      .catch(err => {
        console.log(err);

      })



  }, [])



  // console.log(doctors);

  return (
    <div className=' min-h-screen gradient w-full'>
      <div className="about h-full mb-20 gap-5 w-full flex justify-center items-center">
        <div className="text w-[60%] ml-12 mt-30">
          <h2 className='text-4xl font-bold tracking-tighter text-[#004966]'>HospitalMate is a modern, full-stack hospital management system designed to streamline healthcare operations for hospitals, clinics, and medical centers.</h2>
          <h4 className='text-2xl font-medium tracking-tighter text-[#277594] mt-7'>This platform allows administrators, doctors, and patients to manage appointments, medical records, and visit statuses in a simple and secure environment. The goal is to reduce manual workload, improve accuracy, and offer a better experience for both patients and staff.</h4>
        </div>
        <div className="image mt-30 w-[40%] mr-12">
          < img loading='lazy' src="/about-bg.jpg" alt="" className=' rounded-2xl' />

        </div>
      </div>
      <div className="services pb-15 w-full ">
        <h1 className='text-center text-3xl font-bold text-white mt-7'>Our Services</h1>

        <div className="cards pl-11 mt-12 flex justify-start gap-5 items-center flex-wrap">


          {departments.map((item, index) => {
            return (
              <div key={index} className="card mt-5 bg-white transform transition duration-300 ease-in-out hover:scale-103 cursor-pointer shadow-md  h-70 w-60  flex flex-col justify-start items-center rounded-lg overflow-hidden">
                < img loading='lazy' src={item.image} className="w-full h-[62%] object-cover" alt="" />
                <div className="info h-[38%] w-full flex flex-col p-2">
                  <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-700">
                    {item.info}
                  </p>
                </div>
              </div>
            )
          })}


        </div>
      </div>
      <div className="doctors pb-15 pl-12">
        <h1 className='text-center text-3xl font-bold text-white mt-7'>Our Doctors</h1>
        <div className="cards mt-12 flex justify-start gap-5 items-center flex-wrap ">
          {
            doctors.map(doctor => {
              return (
                <div key={doctor._id} className="h-70 doctor w-60 bg-white shadow-lg rounded-2xl overflow-hidden transform transition duration-300 ease-in-out hover:scale-105">
                  < img loading='lazy'
                    src={doctor.image} 
                    alt="Doctor"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-xl font-semibold text-gray-800">Dr. {doctor.firstname} {doctor.secondname}</h2>
                    <p className="text-sm text-gray-600 mt-1">Department: {doctor.department}</p>
                  </div>
                </div>
              )
            })
          }
        </div>

      </div>
    </div>
  )
}

export default About