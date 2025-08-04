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

    //timer of 2s
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log(data)
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/register`,{data},{withCredentials:true})
    .then(response=>{
      console.log(response.data);
      if(response.data.status){
        toast.success("Registration Successfull", { id: toastId })
        navigate("/login")
      }else{
        toast.error(response.data.message, { id: toastId })
      }
    })
    .catch(err=>{
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
        <h2 className='text-7xl font-bold'>Join us today!</h2>
        <h2 className='text-5xl mt-3 font-bold'>It only takes a few seconds to get started.</h2>
      </div>

      <div className="form shadow w-[45vw] h-[fit] py-7 ml-20 border-2 border-white rounded-2xl p-5">
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
              placeholder='Email'
              className='md:py-2 py-1 px-7 w-full border-white border rounded-full'
              {...register("email", {
                required: "Email is required",
                minLength: { value: 3, message: "Min 3 letters required" }
              })}
            />
            
            <input
              type="password"
              placeholder='Password'
              className='md:py-2 py-1 px-7 w-full border-white border rounded-full'
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
          <div className="adress">
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
            className='bg-blue-600 cursor-pointer font-bold text-white py-2 rounded-full mt-2 hover:bg-blue-700 transition'
          >
            {isSubmitting ? "Signing up..." : "Sign Up"}
          </button>
          <p className='text-center'>Already have an account ? <Link className='text-blue-600 font-bold' to="/login">Log In</Link></p>
        </form>
      </div>
    </div>
  )
}

export default Register