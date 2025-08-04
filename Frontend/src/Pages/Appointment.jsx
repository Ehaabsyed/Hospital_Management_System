import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

function Appointment() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch
  } = useForm()

  const [doctors, setdoctors] = useState([])
  const selectedDepartment = watch("department")
  const [appointments, setappointments] = useState([])
  const [show, setshow] = useState(false)
  const [user, setuser] = useState()

  const fetchUserAppointments = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/me`, { withCredentials: true });
      setuser(response.data.user);
      setshow(true)
      setappointments(response.data.appointments || [])
    } catch (err) {
      console.log("Error fetching appointments:", err);
    }
  };

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/appointment/send`,
        { data },
        { withCredentials: true }
      );
      if (response.data.status) {
        toast.success(response.data.message);
        await fetchUserAppointments();
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error("You must be logged in to book an appointment.");
    }
    reset();
  };

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/doctor/getalldoctors`)
      .then(response => setdoctors(response.data.doctors))
      .catch(err => console.log(err))

    fetchUserAppointments()
  }, [])

  return (
    <div className='min-h-screen w-full gradient pt-10 px-4 md:px-12'>
      <h1 className='text-3xl md:text-4xl font-bold text-white text-center'>Book an Appointment</h1>
      <h3 className='text-lg md:text-2xl font-medium text-white text-center mt-6'>Need to consult a doctor? Fill out the form below to schedule your appointment.</h3>

      <div className="form rounded-3xl w-full max-w-5xl mx-auto p-6 md:p-12 mt-10  bg-opacity-10 backdrop-blur-md">
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="text"
              placeholder='First Name'
              className='py-2 px-4 w-full border-white border rounded-full'
              {...register("firstname", {
                required: "First name is required",
                minLength: { value: 3, message: "Min 3 letters required" }
              })}
            />
            <input
              type="text"
              placeholder='Last Name'
              className='py-2 px-4 w-full border-white border rounded-full'
              {...register("secondname", {
                required: "Last name is required",
                minLength: { value: 3, message: "Min 3 letters required" }
              })}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="text"
              placeholder="Email"
              className="py-2 px-4 w-full border-white border rounded-full"
              {...register("email", { required: true })}
            />
            <select
              className="py-2 px-4 w-full border-white border rounded-full text-gray-600"
              {...register("department", { required: true })}
            >
              <option value="">Select Department</option>
              {["Cardiology", "Neurology", "Gynecology", "Pediatrics", "Orthopedics", "Dermatology", "ENT", "Psychiatry", "Urology", "Radiology"]
                .map(dep => <option key={dep} value={dep}>{dep}</option>)}
            </select>
          </div>

          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="text"
              placeholder='Mobile'
              className='py-2 px-4 w-full border-white border rounded-full'
              {...register("phone", { required: true })}
            />
            <input
              type="text"
              placeholder='5 digit Nic code'
              className='py-2 px-4 w-full border-white border rounded-full'
              {...register("nic", { required: true })}
            />
          </div>

          <div className="flex flex-col justify-center items-center md:flex-row gap-3">
            <label htmlFor="dob" className='block w-full'>Date of birth</label>
            <input
              type="date"
              placeholder='Date of birth'
              className='py-2 px-4 w-full border-white border rounded-full'
              {...register("dob", { required: true })}
            />
            <label htmlFor="date" className='block w-full'>Date of appointment</label>
            <input
              type="date"
              placeholder='Date of Appointment'
              className='py-2 px-4 w-full border-white border rounded-full'
              {...register("date", { required: true })}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-3">
            <select
              className="py-2 px-4 w-full border-white border rounded-full"
              {...register("doctor", { required: true })}
              disabled={!selectedDepartment}
            >
              <option value="">Select Doctor</option>
              {doctors.filter(doc => doc.department === selectedDepartment).map((doc, i) => (
                <option key={i} value={`${doc.firstname} ${doc.secondname}`}>
                  {doc.firstname} {doc.secondname}
                </option>
              ))}
            </select>
            <select
              {...register("gender", { required: true })}
              className="py-2 px-4 w-full border-white border rounded-full"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <input
            type="text"
            placeholder='Address'
            className='py-2 px-4 w-full border-white border rounded-full'
            {...register("address", { required: true })}
          />

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isVisited"
              {...register("isVisited")}
              className="w-4 h-4"
            />
            <label htmlFor="isVisited" className="text-sm text-white">
              Have you visited this place?
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className='bg-blue-600 font-bold text-white py-2 px-6 w-fit self-center rounded-full hover:bg-blue-700 transition'
          >
            {isSubmitting ? "Submitting..." : "Get Appointment"}
          </button>
        </form>
      </div>

      <div className="appointments pb-12">
        <h2 className='text-2xl md:text-3xl font-bold text-white text-center mt-10'>
          {show ? "Your Appointments" : "No Appointments Yet!"}
        </h2>

        {appointments.length > 0 && (
          <div className="bg-white w-full max-w-5xl mx-auto p-4 mt-6 rounded-xl flex flex-col gap-4">
            {appointments.map((app, index) => (
              <div key={app._id} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 bg-[#67B9D8] text-black p-4 rounded-xl border border-black">
                <div><span className="font-semibold">#</span> {index + 1}</div>
                <div>{app.firstname} {app.secondname}</div>
                <div className="text-red-500">{app.gender}</div>
                <div>{app.department}</div>
                <div>{app.doctorFirstName} {app.doctorLastName}</div>
                <div>{app.phone}</div>
                <div className="text-blue-700">{app.date}</div>
                <div className={`${app.status === "Pending" ? "text-yellow-400" : ""}`}>
                  <strong>Status:</strong> {app.status}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Appointment
