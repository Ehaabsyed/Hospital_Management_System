import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Doctor() {
  const navigate = useNavigate();
  const [doctor, setdoctor] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();




  const onSubmit = async (data) => {
    const toastId = toast.loading("Creating Doctor....");

    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key === 'image') {
        formData.append('image', value[0]); // single file
      } else {
        formData.append(key, value);
      }
    });

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/doctor/register`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          withCredentials: true
        }
      );

      if (response.data.status) {
        toast.success("Doctor created successfully", { id: toastId })
        reset()

      } else {
        toast.error(response.data.message, { id: toastId })
        reset()

      }

    } catch (err) {
      console.error(err);
      toast.error('Failed to create doctor', { id: toastId });
      reset()

    }
  };


  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/doctor/getalldoctors`)
      .then((response) => {
        setdoctor(response.data.doctors);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/isAdmin`, { withCredentials: true })
      .then((response) => {
        if (!response.data.status) {
          toast.error(response.data.message);
          navigate('/login');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="form shadow w-[45vw] h-[fit] py-5 ml-20 border-2 border-black mt-15 rounded-2xl p-5">
        <form
          onSubmit={handleSubmit(onSubmit)}
          encType="multipart/form-data"
          className="flex flex-col gap-4"
        >
          <h2 className="text-2xl font-bold text-black text-center">Add a doctor</h2>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="First Name"
              className="md:py-2 py-1 px-7 w-full border-black border rounded-full"
              {...register('firstname', {
                required: 'firstname is required',
                minLength: { value: 2, message: 'Min 3 letters required' },
              })}
            />
            <input
              type="text"
              placeholder="Last Name"
              className="md:py-2 py-1 px-7 w-full border-black border rounded-full"
              {...register('secondname', {
                required: 'secondname is required',
                minLength: { value: 2, message: 'Min 3 letters required' },
              })}
            />
          </div>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Email"
              className="md:py-2 py-1 px-7 w-full border-black border rounded-full"
              {...register('email', {
                required: 'Email is required',
                minLength: { value: 2, message: 'Min 3 letters required' },
              })}
            />
            <input
              type="password"
              placeholder="Password"
              className="md:py-2 py-1 px-7 w-full border-black border rounded-full"
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 2, message: 'Min 3 letters required' },
              })}
            />
          </div>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Mobile"
              className="md:py-2 py-1 px-7 w-full border-black border rounded-full"
              {...register('phone', {
                required: 'phone is required',
                minLength: { value: 3, message: 'Min 3 letters required' },
              })}
            />
            <input
              type="text"
              placeholder="5 digit Nic code"
              className="md:py-2 py-1 px-7 w-full border-black border rounded-full"
              {...register('nic', {
                required: 'nic is required',
                minLength: { value: 5, message: 'max 5 digits required' },
              })}
            />
          </div>
          <div className="flex gap-3">
            <input
              type="Date"
              placeholder="Date of birth"
              className="md:py-2 py-1 px-7 w-full border-black border rounded-full"
              {...register('dob', {
                required: 'Date of birth is required',
                minLength: { value: 3, message: 'Min 3 letters required' },
              })}
            />
            <select
              id="gender"
              {...register('gender', { required: true })}
              className="border px-7 w-full rounded-full py-2 border-black"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="flex gap-3">
            <select
              className="md:py-2 py-1 px-7 w-full border-black border rounded-full text-gray-600"
              {...register('department', { required: 'Department is required' })}
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
            <input
              type="text"
              placeholder="Qualification"
              className="md:py-2 py-1 px-7 w-full border-black border rounded-full"
              {...register('qualification', {
                required: 'qualification is required',
                minLength: { value: 2, message: 'Min 3 letters required' },
              })}
            />
          </div>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder=" Years of Experience"
              className="md:py-2 py-1 px-7 w-full border-black border rounded-full"
              {...register('experience', {
                required: 'experience is required',
                minLength: { value: 1, message: 'Min 3 letters required' },
              })}
            />
            <input
              type="file"
              accept="image/*"
              {...register('image')}
              className="md:py-2 py-1 px-7 w-full border-black border rounded-full"
            />
          </div>
          <input
            type="text"
            placeholder="city"
            className="md:py-2 py-1 px-7 w-full border-black border rounded-full"
            {...register('address', {
              required: 'Adress is required',
              minLength: { value: 5, message: 'adress required' },
            })}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 cursor-pointer font-bold text-white w-fit px-8 place-self-center py-2 rounded-full mt-2 hover:bg-blue-700 transition"
          >
            {isSubmitting ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
      </div>

      <div className="all mt-12 border-t-2 border-black w-full flex flex-col justify-center items-center ">
        <h1 className="text-3xl text-black font-bold underline">All Doctors</h1>
        <div className="cards ml-10 mt-8 flex gap-5 flex-wrap justify-start items-start mb-12">
          {doctor.map((doctor) => (
            <div
              key={doctor._id}
              className="h-70 doctor w-60 shadow-lg rounded-2xl overflow-hidden transform transition duration-300"
            >
              <img
                loading="lazy"
                src={doctor.image}
                alt="Doctor"
                className="w-full  h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-black">
                  Dr. {doctor.firstname} {doctor.secondname}
                </h2>
                <p className="text-sm font-medium text-black mt-1">Department: {doctor.department}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Doctor;
