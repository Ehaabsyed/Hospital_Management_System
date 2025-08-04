import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm()

  const onSubmit = async (data) => {
    const toastId = toast.loading("Logging user....")
    await new Promise((resolve) => setTimeout(resolve, 2000))

    axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/login`, { data }, { withCredentials: true })
      .then(response => {
        if (response.data.status) {
          toast.success("Logged In Successfully", { id: toastId })
          console.log(response.data);
          
          navigate("/")
        } else {
          toast.error(response.data.message, { id: toastId })
        }
      })
      .catch(err => {
        console.log(err)
        toast.error("Login failed", { id: toastId })
      })

    reset()
  }

  return (
    <div className='min-h-screen w-full gradient flex flex-col md:flex-row justify-center items-center relative px-4 py-8'>

      {/* Logo */}
      <div className="logo absolute z-10 top-3 md:left-5 left-[50%] -translate-x-[50%]">
        <img src="/logo.png" className='w-40 h-40 md:h-20 md:w-20 object-contain' alt="MediNest Logo" />
      </div>

      {/* Welcome Text - hidden on small screens */}
      <div className="text md:w-[38%] text-[#004966] hidden md:block">
        <h2 className='text-5xl font-bold'>Welcome Back!</h2>
        <h2 className='text-3xl mt-3 font-bold'>Log in to continue your health journey with MediNest.</h2>
      </div>

      {/* Form */}
      <div className="form shadow w-full md:w-[30vw] max-w-md py-10 mt-10 md:mt-0 border-2 border-white rounded-2xl px-6 backdrop-blur-sm">
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
          <input
            type="text"
            placeholder='Email'
            className='py-2 px-5 w-full border-white border rounded-full'
            {...register("email", {
              required: "Email is required",
              minLength: { value: 3, message: "Min 3 letters required" }
            })}
          />
          {errors.email && (
            <p className='text-red-500 text-xs font-medium ml-3'>
              {errors.email.message}
            </p>
          )}

          <input
            type="password"
            placeholder='Password'
            className='py-2 px-5 w-full border-white border rounded-full'
            {...register("password", {
              required: "Password is required",
              minLength: { value: 3, message: "Min 3 letters required" }
            })}
          />
          {errors.password && (
            <p className='text-red-500 text-xs font-medium ml-3'>
              {errors.password.message}
            </p>
          )}

          <div className="text-right text-sm text-blue-600 hover:underline pr-3">
            <Link to="/forgot-password">Forgot password?</Link>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className='bg-blue-600 cursor-pointer font-bold text-white py-2 rounded-full mt-2 hover:bg-blue-700 transition'
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>

          <p className='text-center text-sm'>
            Don’t have an account?{" "}
            <Link className='text-blue-600 font-bold' to="/register">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login
