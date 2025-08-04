import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm()

  const onSubmit = async (data) => {
    //timer of 2s
    await new Promise((resolve) => setTimeout(resolve, 2000))
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/message/send`,{data},{withCredentials:true})
    .then(response=>{
      // console.log(response.data);
      if(response.data.status){
        toast.success("Message sent successfully")
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
    <div className=' min-h-screen w-full gradient pt-22'>
      <h1 className='text-3xl font-bold text-white tracking-tight text-center'>Have a question, feedback, or just want to say hello? We're here to help. Fill out the form below and we'll get back to you as soon as possible.</h1>
      <div className="form mt-15 shadow w-3/5 h-full place-self-center border-2 border-white p-7 rounded-2xl ">
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
          <div className="flex gap-5">
            <input
              type="text"
              placeholder='First name'
              className='md:py-2 py-1 px-7 w-full border-white border rounded-full'
              {...register("firstname", {
                required: "Firstname is required",
                minLength: { value: 3, message: "Min 3 letters required" }
              })}
            />


            <input
              type="text"
              placeholder='Second name'
              className='md:py-2 py-1 px-7 w-full border-white border rounded-full'
              {...register("secondname", {
                required: "Secondname is required",
                minLength: { value: 3, message: "Min 3 letters required" }
              })}
            />
          </div>
          <div className="flex gap-5">
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
              type="text"
              placeholder='Mobile'
              className='md:py-2 py-1 px-7 w-full border-white border rounded-full'
              {...register("phone", {
                required: "phone is required",
                minLength: { value: 10, message: "Min 10 letters required" }
              })}
            />
          </div>
            <textarea placeholder='Your message!' className=' py-3 px-7 w-full border-white border rounded-3xl'  {...register("message", { required: true })}></textarea>



          <button
            type="submit"
            disabled={isSubmitting}
            className='bg-blue-600 cursor-pointer font-bold text-white py-2 rounded-full mt-2 hover:bg-blue-700 transition'
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>

      </div>
    </div>
  )
}

export default Contact