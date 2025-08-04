import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'

function Register() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm()

  const onSubmit = async (data) => {
    const toastId = toast.loading("Creating user....");
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log(data)
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/register`, { data }, { withCredentials: true })
      .then(response => {
        if (response.data.status) {
          toast.success("Registration Successful", { id: toastId })
          navigate("/login")
        } else {
          toast.error(response.data.message, { id: toastId })
        }
      })
      .catch(err => {
        console.log(err)
        toast.error("Registration failed", { id: toastId })
      })

    reset()
  }

  return (
    <div className='min-h-screen w-full gradient flex flex-col md:flex-row justify-center items-center px-4 py-10'>

      {/* Logo */}
      <div className="logo absolute z-10 top-3 md:left-15 left-[50%] -translate-x-[50%]">
        <img src="/logo.png" className='md:w-20 md:h-20 h-22 w-22 object-contain' alt="Logo" />
      </div>

      {/* Left Text */}
      <div className="text hidden md:block md:w-1/2 text-[#004966] px-6">
        <h2 className='text-5xl font-bold'>Join us today!</h2>
        <h2 className='text-3xl mt-3 font-bold'>It only takes a few seconds to get started.</h2>
      </div>

      {/* Right Form */}
      <div className="form w-full md:w-[45%]  backdrop-blur-sm shadow-lg rounded-2xl border-2 border-white p-6">
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>

          {/* Row 1: First Name & Last Name */}
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

          {/* Row 2: Email & Password */}
          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="text"
              placeholder='Email'
              className='py-2 px-4 w-full border-white border rounded-full'
              {...register("email", {
                required: "Email is required",
                minLength: { value: 3, message: "Min 3 letters required" }
              })}
            />
            <input
              type="password"
              placeholder='Password'
              className='py-2 px-4 w-full border-white border rounded-full'
              {...register("password", {
                required: "Password is required",
                minLength: { value: 3, message: "Min 3 letters required" }
              })}
            />
          </div>

          {/* Row 3: Mobile & NIC */}
          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="text"
              placeholder='Mobile'
              className='py-2 px-4 w-full border-white border rounded-full'
              {...register("phone", {
                required: "Phone is required",
                minLength: { value: 3, message: "Min 3 digits required" }
              })}
            />
            <input
              type="text"
              placeholder='5-digit NIC code'
              className='py-2 px-4 w-full border-white border rounded-full'
              {...register("nic", {
                required: "NIC is required",
                minLength: { value: 5, message: "Exactly 5 digits required" },
                maxLength: { value: 5, message: "Exactly 5 digits required" }
              })}
            />
          </div>

          {/* Row 4: DOB & Gender */}
          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="date"
              className='py-2 px-4 w-full border-white border rounded-full'
              {...register("dob", {
                required: "Date of birth is required"
              })}
            />
            <select
              id="gender"
              {...register("gender", { required: true })}
              className="border px-4 py-2 w-full rounded-full border-white"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          {/* Address */}
          <div>
            <input
              type="text"
              placeholder='Address'
              className='py-2 px-4 w-full border-white border rounded-full'
              {...register("address", {
                required: "Address is required",
                minLength: { value: 5, message: "Minimum 5 characters" }
              })}
            />
          </div>

          {/* Checkbox */}
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

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className='bg-blue-600 cursor-pointer font-bold text-white py-2 rounded-full mt-2 hover:bg-blue-700 transition'
          >
            {isSubmitting ? "Signing up..." : "Sign Up"}
          </button>

          <p className='text-center text-sm'>
            Already have an account?{" "}
            <Link className='text-blue-600 font-bold' to="/login">Log In</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Register
