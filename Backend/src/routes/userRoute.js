import express from "express";
import { changePass, createUser, getallPatients, resetPass, sendOtp, userlogin } from "../controllers/userController.js";
import { isAdminauthenticated, isPatientauthenticated } from "../middlewares/auth.js";
import { get } from "mongoose";
import { appointmentModel } from "../models/appointmentSchema.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Patient route is working");
});



router.post("/register", createUser)
router.post("/login", userlogin)
router.post("/forgot-password", sendOtp)
router.post("/reset-password", resetPass)
router.post("/change-password", changePass)
router.get("/getallpatients", isAdminauthenticated, getallPatients)



//get user loggedIn appointments
router.get("/me", isPatientauthenticated,async (req, res) => {
  console.log("asas");
  
  const appointments=await appointmentModel.find({email:req.user.email})
  console.log(appointments);
  
  res.status(200).json({
    success: true,
    appointments:appointments 
  });
});
export default router
