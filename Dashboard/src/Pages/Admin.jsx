import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

function Admin() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm()
  const onSubmit = async (data) => {
    //timer of 2s
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log(data);

    axios.post(`${import.meta.env.VITE_BACKEND_URL}/admin/register`, { data }, { withCredentials: true })
      .then(response => {
        // console.log(response.data);
        if (response.data.status) {
          toast.success(response.data.message)
        } else {
          toast.error(response.data.message)
        }


      })
      .catch(err => {
        console.log(err);
      })
    reset()


  }
  const [admins, setadmins] = useState([])
  useEffect(() => {

    axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/getall`, { withCredentials: true })
      .then(response => {
        console.log(response.data);
        setadmins(response.data.data)

      })
      .catch(err => {
        console.log(err);

      })

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
  return (
    <div className="flex flex-col justify-center items-center gap-3.5 mb-20">
      <div className="flex justify-center items-center">
        <div className="text w-[38%] text-[#000000]">
          <h2 className='text-7xl font-bold'>🔐Admin Access Only</h2>
          <h2 className='text-3xl mt-3 font-bold'>Please sign in with your administrator credentials to manage users, appointments, and system settings.</h2>
        </div>
        <div className="form shadow mt-20 w-[45vw] h-[fit] py-7 ml-20 border-2 border-black rounded-2xl p-5">
          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder='First Name'
                className='md:py-2 py-1 px-7 w-full border-black border rounded-full'
                {...register("firstname", {
                  required: "firstname is required",
                  minLength: { value: 3, message: "Min 3 letters required" }
                })}
              />


              <input
                type="text"
                placeholder='Last Name'
                className='md:py-2 py-1 px-7 w-full border-black border rounded-full'
                {...register("secondname", {
                  required: "secondname is required",
                  minLength: { value: 3, message: "Min 3 letters required" }
                })}
              />

            </div>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder='Email'
                className='md:py-2 py-1 px-7 w-full border-black border rounded-full'
                {...register("email", {
                  required: "Email is required",
                  minLength: { value: 3, message: "Min 3 letters required" }
                })}
              />

              <input
                type="password"
                placeholder='Password'
                className='md:py-2 py-1 px-7 w-full border-black border rounded-full'
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 3, message: "Min 3 letters required" }
                })}
              />

            </div>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder='Mobile'
                className='md:py-2 py-1 px-7 w-full border-black border rounded-full'
                {...register("phone", {
                  required: "phone is required",
                  minLength: { value: 3, message: "Min 3 letters required" }
                })}
              />


              <input
                type="text"
                placeholder='5 digit Nic code'
                className='md:py-2 py-1 px-7 w-full border-black border rounded-full'
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
                className='md:py-2 py-1 px-7 w-full border-black border rounded-full'
                {...register("dob", {
                  required: "Date of birth is required",
                  minLength: { value: 3, message: "Min 3 letters required" }
                })}
              />


              <select
                id="gender"
                {...register("gender", { required: true })}
                className="border px-7 w-full rounded-full py-2 border-black"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="adress">
              <input
                type="text"
                placeholder='Adress'
                className='md:py-2 py-1 px-7 w-full border-black border rounded-full'
                {...register("address", {
                  required: "Adress is required",
                  minLength: { value: 5, message: "adress required" }
                })}

              />
            </div>


            <button
              type="submit"
              disabled={isSubmitting}
              className='bg-blue-600 cursor-pointer font-bold text-black py-2 rounded-full mt-2 hover:bg-blue-700 transition'
            >
              {isSubmitting ? "Creating..." : "Create"}
            </button>
          </form>
        </div>
      </div>
      <div className="admin mt-15 flex flex-col justify-center items-center">
        <h1 className='text-2xl font-bold text-center'>Admins</h1>
        <p className='text-xl font-medium mr-250'>Total No of Admins : {admins.length}</p>

        <div className="cards flex justify-center items-center flex-wrap gap-5">
          {
            admins.map(admin => {
              return (
                <div key={admin._id} className="max-w-md p-6 bg-white border border-black mt-10 rounded-2xl shadow-md font-sans space-y-2">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {admin.firstname} {admin.secondname}
                  </h2>
                  <p><strong>DOB:</strong> {admin.dob}</p>
                  <p><strong>Gender:</strong> {admin.gender}</p>
                  <p><strong>Address:</strong> {admin.address}</p>
                  <p><strong>Mobile:</strong> +91 {admin.phone}</p>
                  <p><strong>Email:</strong> {admin.email}</p>
                </div>

              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Admin