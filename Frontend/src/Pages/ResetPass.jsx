import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function ResetPass() {
  const [showPasswordField, setShowPasswordField] = useState(false);
  const { handleSubmit, formState: { isSubmitting } } = useForm();
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
const navigate=useNavigate()
  const savedEmail = localStorage.getItem("ResetEmail") || "";

  const handleOtpVerify = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/reset-password`,
        { otp, email: savedEmail },
        { withCredentials: true }
      );

      if (data.status) {
        toast.success("OTP Verified");
        setShowPasswordField(true);
      } else if (!data.time) {
        toast.error("OTP is expired");
      } else {
        toast.error("OTP did not match");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong while verifying OTP");
    }
  };

  const handlePasswordReset = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/change-password`,
        { email: savedEmail, password },
        { withCredentials: true }
      );

      if (data.success) {
        toast.success("Password changed successfully!");
        localStorage.removeItem("ResetEmail");
        navigate("/login")
        // Redirect to login page if needed
      } else {
        toast.error(data.message || "Failed to reset password");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong while changing password");
    }
  };

  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (!showPasswordField) {
      await handleOtpVerify();
    } else {
      await handlePasswordReset();
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        {showPasswordField ? "Set New Password" : "Enter OTP to Reset Password"}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {!showPasswordField ? (
          <input
            type="text"
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength={6}
            className="border border-gray-300 rounded px-4 py-2 text-center text-lg tracking-widest"
            pattern="\d{6}"
            inputMode="numeric"
            required
          />
        ) : (
          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 text-lg"
            required
          />
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 cursor-pointer font-bold text-white py-2 mt-2 hover:bg-blue-700 transition"
        >
          {isSubmitting
            ? showPasswordField
              ? "Resetting Password..."
              : "Verifying OTP..."
            : showPasswordField
            ? "Reset Password"
            : "Verify OTP"}
        </button>
      </form>
    </div>
  );
}

export default ResetPass;
