import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ForgotPass = () => {
    const navigate=useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm();

    const onSubmit = async (data) => {
        const toastId = toast.loading(`Sending Otp to ${data.email}`);

        //timer of 4s
        await new Promise((resolve) => setTimeout(resolve, 2000))
        console.log("Sending OTP to:", data.email);


        axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/forgot-password`, { data }, { withCredentials: true })
            .then(response => {
                toast.success(response.data.message, { id: toastId });
                reset()
                if(response.data.status){
                    console.log(response.data);
                    
                    localStorage.setItem("ResetEmail",response.data.email)
                    navigate("/reset-password")
                }


            })
            .catch(err => {
                console.log(err);
                toast.error("Failed to Send OTP", { id: toastId });
            })
    };
    return (
        <div className='min-h-screen flex flex-col items-center text-white justify-start bg-zinc-100'>
            <h1 className='text-7xl text-center text-black mt-20'>🔐Admin Access Only</h1>
            <form onSubmit={handleSubmit(onSubmit)} className='bg-black p-6 mt-30 rounded-lg shadow-md w-full max-w-md'>
                <h2 className='text-xl font-semibold mb-4 text-center'>Forgot Password</h2>

                <input
                    type="email"
                    placeholder='Enter your email'
                    className='w-full py-2 px-4 border border-gray-300 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400'
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Invalid email format"
                        }
                    })}
                />
                {errors.email && (
                    <p className='text-red-500 text-sm mb-2'>{errors.email.message}</p>
                )}



                <button
                    type="submit"
                    disabled={isSubmitting}
                    className='w-full bg-white text-black py-2 rounded-md hover:bg-amber-100 cursor-pointer transition'
                >
                    {isSubmitting ? "Sending OTP..." : "Generate OTP"}
                </button>
            </form>
        </div>
    );
};

export default ForgotPass;
