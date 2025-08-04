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
    //timer of 2s
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log(data)

    //axios
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/login`,{data},{withCredentials:true})
    .then(response=>{
      // console.log(response.data);
      if(response.data.status){
        toast.success("Logged In Successfully")
        navigate("/")
      }else{
        toast.error(response.data.message)
      }
      
    })
    .catch(err=>{
      console.log(err);
    })
    reset()
  }

  return (
    <div className='h-screen w-full  flex justify-center items-center absolute top-0 left-0'>
       <div className="logo absolute z-10 top-3 left-[50%] -translate-x-[50%]">
        <img src="/logo.png" className='w-30 h-30' alt="" />
      </div>
      <div className="text w-[38%] text-[#000000]">
        <h2 className='text-7xl font-bold'>🔐Admin Access Only</h2>
        <h2 className='text-3xl mt-3 font-bold'>Please sign in with your administrator credentials to manage users, appointments, and system settings.</h2>
      </div>

      <div className="form shadow w-[30vw] h-[fit] py-15 ml-20 border-2 border-black rounded-2xl p-5">
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
          <input
            type="text"
            placeholder='Email'
            className='md:py-2 py-1 px-7 w-full border-black border rounded-full'
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
            className='md:py-2 py-1 px-7 w-full border-black placeholder:black border rounded-full'
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
          <div className="text-left text-sm text-black hover:underline pr-3">
            <Link to="/forgot-password">Forgot password?</Link>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className='bg-black cursor-pointer font-bold text-white py-2 rounded-full mt-2  transition'
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
