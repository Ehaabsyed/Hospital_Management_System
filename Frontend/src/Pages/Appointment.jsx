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
  const selectedDepartment = watch("department");
  const [appointments, setappointments] = useState([])
  const [show, setshow] = useState(false)

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

      // console.log(response.data);

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



  //get all doctors
  const [user, setuser] = useState()
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/doctor/getalldoctors`)
      .then(response => {
        // console.log(response.data.doctors);
        setdoctors(response.data.doctors)

      })
      .catch(err => {
        console.log(err);

      })


    fetchUserAppointments()
  }, [])

  return (
    <div className=' min-h-screen w-full gradient pt-10'>
      <h1 className='text-4xl font-bold text-white text-center'>Book an Appointment</h1>
      <h3 className='text-2xl font-medium text-white text-center mt-6 ml-5 mr-5'>Need to consult a doctor? Fill out the form below to schedule your appointment at your preferred time and department. Our team will confirm your booking shortly.</h3>
      <div className="form  rounded-3xl w-full p-12 mt-10 ">
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder='First Name'
              className='md:py-2 py-1 px-7 w-full border-white border rounded-full'
              {...register("firstname", {
                required: "firstname is required",
                minLength: { value: 3, message: "Min 3 letters required" }
              })}
            />


            <input
              type="text"
              placeholder='Last Name'
              className='md:py-2 py-1 px-7 w-full border-white border rounded-full'
              {...register("secondname", {
                required: "secondname is required",
                minLength: { value: 3, message: "Min 3 letters required" }
              })}
            />

          </div>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Email"
              className="md:py-2 py-1 px-7 w-full border-white border rounded-full"
              {...register("email", {
                required: "Email is required",
                minLength: { value: 3, message: "Min 3 letters required" },
              })}
            />

            <select
              className="md:py-2 py-1 px-7 w-full border-white border rounded-full text-gray-600"
              {...register("department", { required: "Department is required" })}
            >
              <option value="">Select Department</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Neurology">Neurology</option>
              <option value="Gynecology">Gynecology</option>
              <option value="Pediatrics">Pediatrics</option>
              <option value="Orthopedics">Orthopedics</option>
              <option value="Dermatology">Dermatology</option>
              <option value="ENT">ENT</option>
              <option value="Psychiatry">Psychiatry</option>
              <option value="Urology">Urology</option>
              <option value="Radiology">Radiology</option>
            </select>
          </div>

          <div className="flex gap-3">
            <input
              type="text"
              placeholder='Mobile'
              className='md:py-2 py-1 px-7 w-full border-white border rounded-full'
              {...register("phone", {
                required: "phone is required",
                minLength: { value: 3, message: "Min 3 letters required" }
              })}
            />


            <input
              type="text"
              placeholder='5 digit Nic code'
              className='md:py-2 py-1 px-7 w-full border-white border rounded-full'
              {...register("nic", {
                required: "nic is required",
                minLength: { value: 5, message: "max 5 digits required" }
              })}

            />

          </div>
          <div className="flex gap-3">
            <input
              type="Date"
              placeholder='Date of birth'
              className='md:py-2 py-1 px-7 w-full border-white border rounded-full'
              {...register("dob", {
                required: "Date of birth is required",
                minLength: { value: 3, message: "Min 3 letters required" }
              })}
            />
            <p className='absolute top-127 left-80'>Date of Birth</p>
            <p className='absolute top-127 right-60'>Date of Appointment</p>
            <input
              type="Date"
              placeholder='Date of Appointment'
              className='md:py-2 py-1 px-7 w-full border-white border rounded-full'
              {...register("date", {
                required: "Date of appointment is required",
                minLength: { value: 3, message: "Min 3 letters required" }
              })}
            />



          </div>
          <div className="adress">
            <div className="flex gap-3">
              <select
                className="border px-7 w-full rounded-full py-2 border-white"
                {...register("doctor", { required: "Doctor is required" })}
                disabled={!selectedDepartment}
              >
                <option value="">Select Doctor</option>
                {doctors
                  .filter(doctor => doctor.department === selectedDepartment)
                  .map((doc, index) => (
                    <option
                      value={`${doc.firstname} ${doc.secondname}`}
                      key={index}
                    >
                      {doc.firstname} {doc.secondname}
                    </option>
                  ))}
              </select>





              <select
                id="gender"
                {...register("gender", { required: true })}
                className="border px-7 w-full rounded-full py-2 border-white"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>
          <div className="flex">
            <input
              type="text"
              placeholder='Adress'
              className='md:py-2 py-1 px-7 w-full border-white border rounded-full'
              {...register("address", {
                required: "Adress is required",
                minLength: { value: 5, message: "adress required" }
              })}

            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isVisited"
              {...register("isVisited")}
              className="w-4 h-4"
            />
            <label htmlFor="isVisited" className="text-sm font-medium">
              Have you visited this place?
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className='bg-blue-600 cursor-pointer font-bold text-white py-2 px-8 w-fit place-self-center rounded-full mt-2 hover:bg-blue-700 transition'
          >
            {isSubmitting ? "Submitting..." : "Get Appointment"}
          </button>
        </form>

      </div>
      <div className="appointments pb-12">
        {
          show ? <h2 className='text-3xl font-bold text-white text-center'>Your Appointments</h2> : <h2 className='text-3xl font-bold text-gray-500 text-center'>No Appointments yet!</h2>
        }
        <div className="bg-white w-[90%] p-2 place-self-center mt-10 rounded-xl flex flex-col gap-5 pt-7 pb-7">

          {
            appointments.map((app, index) => {
              return (

                <div key={app._id} className="flex bg-[#67B9D8]  justify-between w-full items-center text-black font-medium text-xl pl-5 pr-5 h-14 rounded-xl border-black border-2  place-self-center">
                  <div className="index">{index + 1}</div>
                  <div className="name">{app.firstname} {app.secondname}</div>
                  <div className="age text-red-500"> {app.gender}</div>
                  <div className="age "> {app.department}</div>
                  <div className="age"> {app.doctorFirstName} {app.doctorLastName}</div>
                  <div className="phone">{app.phone}</div>
                  <div className="date text-blue-700">{app.date}</div>
                  <div className={app.status == "Pending" ? "text-yellow-300 flex justify-center items-center" : "flex justify-center items-center"}> <p className='text-black'>Status : </p> {app.status}</div>

                </div>

              )
            })
          }
        </div>


      </div>

    </div>
  )
}

export default Appointment
