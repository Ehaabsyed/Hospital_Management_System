import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Appointments() {
  const [Status, setStatus] = useState()
  const statusColors = {
    Pending: "bg-yellow-300 text-yellow-900",
    Accepted: "bg-green-300 text-green-900",
    Rejected: "bg-red-300 text-red-900",
  };
  const [appointments, setappointments] = useState([])
  const fetchUserAppointments = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/appointment/getallappointments`, { withCredentials: true });
      // console.log(response.data);

      setappointments(response.data.appointments);
    } catch (err) {
      console.log("Error fetching appointments:", err);
    }
  };

  const updateStatus = (id, status) => {
  const toastId = toast.loading("Updating appointment status...");

  axios.post(`${import.meta.env.VITE_BACKEND_URL}/appointment/update/${id}`, { status }, { withCredentials: true })
    .then(response => {
      toast.success(response.data.message, { id: toastId });
      
      setappointments((prev) =>
        prev.map((app) =>
          app._id === id ? { ...app, status } : app
        )
      );
    })
    .catch(err => {
      toast.error("Failed to update appointment status", { id: toastId });
      console.log(err);
    });
};

const handleDelete = async (id) => {
  let confirm=window.confirm("Are you sure you want to delete?")
  if(!confirm){
    return;
  }
  try {
    const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/appointment/delete/${id}`,{}, {withCredentials: true,});
    console.log(res);
    
    toast.success(res.data.message);

    // Remove the deleted appointment from state
    setappointments((prev) => prev.filter((app) => app._id !== id));
  } catch (err) {
    console.log(err);
    toast.error(err.response?.data?.message || "Failed to delete");
  }
};

  
  const navigate = useNavigate()
  const [total, settotal] = useState([])
  const [accepted, setaccepted] = useState([])
  const [rejected, setrejected] = useState([])
  const [pending, setpending] = useState([])
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/getInfo/send`, { withCredentials: true })
      .then(response => {
        // console.log(response.data);
        settotal(response.data.appointments)
        setaccepted(response.data.Accepted)
        setrejected(response.data.Rejected)
        setpending(response.data.Pending)
      })
      .catch(err => {
        console.log(err);
      })
      
  }, [])
  useEffect(() => {
  fetchUserAppointments(); // ✅ Prefer this one
}, []);
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
    <div className="flex flex-col">
      <div className='flex gap-6 ml-22 items-center justify-center mt-12'>
        <div className="bg-[#8ecae6] p-4 rounded-xl shadow-md w-70 text-center">
          <h3 className="text-lg font-semibold ">Total Appointments</h3>
          <p className="text-2xl font-bold ">{total}</p>
        </div>
        <div className="bg-[#80ed99] p-4 rounded-xl shadow-md w-70 text-center">
          <h3 className="text-lg font-semibold ">Accepted Appointments</h3>
          <p className="text-2xl font-bold ">{accepted}</p>
        </div>
        <div className="bg-[#f25c54] p-4 rounded-xl shadow-md w-70 text-center">
          <h3 className="text-lg font-semibold ">Pending Appointments</h3>
          <p className="text-2xl font-bold ">{pending}</p>
        </div>
        <div className="bg-[#ffa200] p-4 rounded-xl shadow-md w-70 text-center">
          <h3 className="text-lg font-semibold ">Rejected Appointments</h3>
          <p className="text-2xl font-bold ">{rejected}</p>
        </div>
      </div>
      <div className="all bg-green-300 mt-10 p-4">
        <h1 className='text-3xl font-bold text-center text-black'>All appointments</h1>


        <div className="overflow-x-auto p-4">
          <table className="min-w-full bg-white border-2 border-black rounded shadow">
            <thead className="text-black">
              <tr className="font-bold">
                <th className="py-2 px-4 border">#</th>
                <th className="py-2 px-4 border">Patient Name</th>
                <th className="py-2 px-4 border">Gender</th>
                <th className="py-2 px-4 border">Doctor</th>
                <th className="py-2 px-4 border">Appointment Date</th>
                <th className="py-2 px-4 border">Mobile</th>
                <th className="py-2 px-4 border">Department</th>
                <th className="py-2 px-4 border">Status</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                appointments.map((app,index) => {
                  return (
                    <tr key={app._id} className="text-center font-medium">
                      <td className="py-2 px-4 border">{index+1}</td>
                      <td className="py-2 px-4 border">{app.firstname} {app.secondname}</td>
                      <td className="py-2 px-4 border">{app.gender}</td>
                      <td className="py-2 px-4 border">{app.doctorFirstName} {app.doctorLastName}</td>
                      <td className="py-2 px-4 border">{app.date}</td>
                      <td className="py-2 px-4 border">{app.phone}</td>
                       <td className="py-2 px-4 border">
                        <span className="text-green-600 font-semibold">{app.department}</span>
                      </td>
                      <td className="py-2 px-4 border">
                        <select className={`border rounded px-2 py-1 font-semibold ${statusColors[app.status]}`} value={app.status} onChange={(e)=>{
                          // console.log(e.target.value);
                          updateStatus(app._id,e.target.value)
                          
                        }}>
                          <option value="Pending">Pending</option>
                          <option value="Accepted">Accepted</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </td>
                     
                      <td className="py-2 px-4 border">
                        <button onClick={()=>handleDelete(app._id)} className="bg-red-500 cursor-pointer hover:bg-red-600 text-white px-3 py-1 rounded">
                          Delete
                        </button>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>

        </div>

      </div>
    </div>
  )
}

export default Appointments