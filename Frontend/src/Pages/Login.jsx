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
    const toastId = toast.loading("Creating user....");

    //timer of 2s
    await new Promise((resolve) => setTimeout(resolve, 2000))

    //axios
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/login`, { data }, { withCredentials: true })
      .then(response => {
        // console.log(response.data);
        if (response.data.status) {
          toast.success("Logged In Successfully", { id: toastId })
          navigate("/")
        } else {
          toast.error(response.data.message, { id: toastId })
        }

      })
      .catch(err => {
        console.log(err);
        toast.error(err, { id: toastId })
      })
    reset()
  }

  return (
    <div className='h-screen w-full gradient flex justify-center items-center absolute top-0 left-0'>
      <div className="logo absolute z-10 top-3 left-10">
        <img src="/logo.png" className='w-30 h-30' alt="" />
      </div>
      <div className="text w-[38%] text-[#004966]">
        <h2 className='text-7xl font-bold'>Welcome Back!</h2>
        <h2 className='text-5xl mt-3 font-bold'>Log in to continue your health journey with MediNest.</h2>
      </div>

      <div className="form shadow w-[30vw] h-[fit] py-15 ml-20 border-2 border-white rounded-2xl p-5">
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
          <input
            type="text"
            placeholder='Email'
            className='md:py-2 py-1 px-7 w-full border-white border rounded-full'
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
            className='md:py-2 py-1 px-7 w-full border-white border rounded-full'
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

          <div className="text-left text-sm text-blue-600 hover:underline pr-3">
            <Link to="/forgot-password">Forgot password?</Link>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className='bg-blue-600 cursor-pointer font-bold text-white py-2 rounded-full mt-2 hover:bg-blue-700 transition'
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>

          <p className='text-center'>
            Don’t have an account?{" "}
            <Link className='text-blue-600 font-bold' to="/register">Sign up</Link>
          </p>
        </form>

      </div>
    </div>
  )
}

export default Login
