import axios from 'axios';
import React, { useEffect, useState } from 'react';

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
  const [doctors, setdoctors] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/doctor/getalldoctors`)
      .then(response => {
        setdoctors(response.data.doctors);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div className='min-h-screen gradient w-full px-4 sm:px-6 lg:px-10'>
      {/* About Section */}
      <div className="about flex flex-col lg:flex-row items-center justify-center mb-20 gap-10 pt-10">
        <div className="text w-full lg:w-3/5">
          <h2 className='text-3xl sm:text-4xl font-bold tracking-tight text-[#004966]'>
            HospitalMate is a modern, full-stack hospital management system designed to streamline healthcare operations for hospitals, clinics, and medical centers.
          </h2>
          <h4 className='text-xl sm:text-2xl font-medium tracking-tight text-[#277594] mt-5'>
            This platform allows administrators, doctors, and patients to manage appointments, medical records, and visit statuses in a simple and secure environment. The goal is to reduce manual workload, improve accuracy, and offer a better experience for both patients and staff.
          </h4>
        </div>
        <div className="image w-full lg:w-2/5">
          <img loading='lazy' src="/about-bg.jpg" alt="" className='rounded-2xl w-full h-auto object-cover' />
        </div>
      </div>

      {/* Services Section */}
      <div className="services">
        <h1 className='text-center text-3xl font-bold text-white mt-7'>Our Services</h1>
        <div className="cards mt-10 flex flex-wrap justify-center gap-5">
          {departments.map((item, index) => (
            <div key={index} className="card bg-white shadow-md md:h-72 md:w-60 w-90 h-70 rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 cursor-pointer">
              <img loading='lazy' src={item.image} className="w-full h-[60%] object-cover" alt={item.title} />
              <div className="p-3">
                <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                <p className="text-sm text-gray-700">{item.info}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Doctors Section */}
      <div className="doctors mt-16">
        <h1 className='text-center text-3xl font-bold text-white mt-7'>Our Doctors</h1>
        <div className="cards mt-10 pb-5 flex flex-wrap justify-center gap-5">
          {doctors.map((doctor) => (
            <div key={doctor._id} className="doctor bg-white shadow-lg md:w-60 w-90 rounded-2xl overflow-hidden transform transition duration-300 hover:scale-105">
              <img loading='lazy' src={doctor.image} alt="Doctor" className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">Dr. {doctor.firstname} {doctor.secondname}</h2>
                <p className="text-sm text-gray-600 mt-1">{doctor.qualification}</p>
                <p className="text-sm text-gray-600 mt-1">Department: {doctor.department}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;
