import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

function Message() {
  const [messages, setmessages] = useState([])
  const navigate = useNavigate()
  useEffect(() => {

    axios.get(`http://localhost:3000/isAdmin`, { withCredentials: true })
      .then(response => {
        if (!response.data.status) {
          toast.error(response.data.message)
          navigate("/login")
        }
      })
      .catch(err => {
        console.log(err);

      })



  }, [])

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/message/getallmessages`, { withCredentials: true })
      .then(response => {
        
        setmessages(response.data.data);

      })
      .catch(err => {
        console.log(err);
      })
  }, [])
  return (
    <div className='flex flex-col'>
      <h1 className='text-3xl mt-8 font-bold text-black text-center'>All Messages from Patients</h1>
      <div className="messages gap-5 flex flex-wrap justify-center items-center mt-15">
        {messages.map(message => {
          const shortDate = message.date.slice(0, 10)
          return (
            <div className="max-w-xs p-4 bg-white border border-black rounded-lg shadow-sm font-sans">
              <h2 className="text-lg font-semibold mb-2">{message.firstname} {message.secondname}</h2>
              <p className='text-blue-600'><strong className='text-black'>Mobile:</strong> +91{message.phone}</p>
              <p><strong>Email:</strong> {message.email}</p>
              <p><strong>Date:</strong> {shortDate}</p>
              <div className="mt-3 p-3 bg-gray-100 rounded-md italic text-gray-600 break-words max-h-40 overflow-auto">
                {/* This div will scroll if message is too long */}
                {message.message}
              </div>
            </div>
          )
        })}




      </div>
    </div>
  )
}

export default Message