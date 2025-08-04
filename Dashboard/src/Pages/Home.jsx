import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { FaInfoCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [appointments, setappointments] = useState([])
  const [messages, setmessages] = useState([])
  const [doctors, setdoctors] = useState([])
  const [patients, setpatients] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/getInfo/send`, { withCredentials: true })
      .then(response => {
        console.log(response.data);
        setappointments(response.data.appointments)
        setdoctors(response.data.doctors)
        setmessages(response.data.messages)
        setpatients(response.data.Patients)
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

 useEffect(() => {

    axios.get(`http://localhost:3000/isAdmin`, { withCredentials: true })
    .then(response=>{
      if(!response.data.status){
        toast.error(response.data.message)
          navigate("/login")
      }
    })
    .catch(err=>{
      console.log(err);
      
    })
    
    
    
  }, [])
  return (
    <div>
      {/* Example Quick Stats (optional UI component) */}
      <div className="flex place-self-center gap-6 mt-14">
        <div className="bg-[#8ecae6] p-4 rounded-xl shadow-md w-80 text-center">
          <h3 className="text-lg font-semibold ">Total Appointments</h3>
          <p className="text-2xl font-bold ">{appointments}</p>
        </div>
        <div className="bg-[#80ed99] p-4 rounded-xl shadow-md w-80 text-center">
          <h3 className="text-lg font-semibold ">Active Doctors</h3>
          <p className="text-2xl font-bold ">{doctors}</p>
        </div>
        <div className="bg-[#f25c54] p-4 rounded-xl shadow-md w-80 text-center">
          <h3 className="text-lg font-semibold ">Unread Messages</h3>
          <p className="text-2xl font-bold ">{messages}</p>
        </div>
        <div className="bg-[#ffa200] p-4 rounded-xl shadow-md w-80 text-center">
          <h3 className="text-lg font-semibold ">Total Patients</h3>
          <p className="text-2xl font-bold ">{patients}</p>
        </div>
      </div>
      <div className="max-w-xl mx-auto mt-10 bg-white rounded-2xl shadow-lg p-6 border border-blue-100">
        <div className="flex items-center mb-4">
          <FaInfoCircle className="text-blue-500 text-2xl mr-2" />
          <h2 className="text-xl font-semibold text-gray-800">Admin Instructions</h2>
        </div>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Review new appointments daily and update their status.</li>
          <li>Keep doctor profiles updated with accurate availability.</li>
          <li>Respond to patient messages in a timely manner.</li>
          <li>Ensure system settings are secure and up-to-date.</li>
          <li>Monitor activity logs regularly for any unusual behavior.</li>
        </ul>
      </div>

    </div>
  )
}

export default Home