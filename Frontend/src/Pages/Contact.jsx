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
    await new Promise((resolve) => setTimeout(resolve, 2000))
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/message/send`, { data }, { withCredentials: true })
      .then(response => {
        if (response.data.status) {
          toast.success("Message sent successfully")
        } else {
          toast.error(response.data.message)
        }
      })
      .catch(err => {
        console.log(err)
      })
    reset()
  }

  return (
    <div className='min-h-screen w-full gradient py-16 px-4'>
      <h1 className='text-3xl md:text-4xl font-bold text-white tracking-tight text-center max-w-4xl mx-auto'>
        Have a question, feedback, or just want to say hello? We're here to help. Fill out the form below and we'll get back to you as soon as possible.
      </h1>

      <div className="form mt-12 bg-opacity-10 backdrop-blur border border-white p-6 md:p-10 rounded-2xl max-w-3xl mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
          {/* Name Fields */}
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder='First name'
              className='py-2 px-5 w-full border border-white bg-transparent text-white placeholder-white rounded-full focus:outline-none'
              {...register("firstname", {
                required: "Firstname is required",
                minLength: { value: 3, message: "Min 3 letters required" }
              })}
            />
            <input
              type="text"
              placeholder='Second name'
              className='py-2 px-5 w-full border border-white bg-transparent text-white placeholder-white rounded-full focus:outline-none'
              {...register("secondname", {
                required: "Secondname is required",
                minLength: { value: 3, message: "Min 3 letters required" }
              })}
            />
          </div>

          {/* Contact Fields */}
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="email"
              placeholder='Email'
              className='py-2 px-5 w-full border border-white bg-transparent text-white placeholder-white rounded-full focus:outline-none'
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email"
                }
              })}
            />
            <input
              type="tel"
              placeholder='Mobile'
              className='py-2 px-5 w-full border border-white bg-transparent text-white placeholder-white rounded-full focus:outline-none'
              {...register("phone", {
                required: "Phone is required",
                minLength: { value: 10, message: "Min 10 digits required" }
              })}
            />
          </div>

          {/* Message Field */}
          <textarea
            placeholder='Your message!'
            rows={4}
            className='py-3 px-5 w-full border border-white bg-transparent text-white placeholder-white rounded-3xl focus:outline-none resize-none'
            {...register("message", { required: true })}
          ></textarea>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className='bg-blue-600 hover:bg-blue-700 transition py-2 rounded-full font-bold text-white'
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Contact
