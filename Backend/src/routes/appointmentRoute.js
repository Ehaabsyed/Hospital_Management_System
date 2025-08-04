import express from "express";
import { deleteAppointment, getAllAppointments, sendAppointment, updateStatus } from "../controllers/appointmentController.js";
import { isAdminauthenticated, isPatientauthenticated } from "../middlewares/auth.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Appointment route is working");
});



router.post("/send",isPatientauthenticated,  sendAppointment) 
router.get("/getallappointments",isAdminauthenticated, getAllAppointments)
router.post("/update/:id",isAdminauthenticated,  updateStatus) 
router.post("/delete/:id",isAdminauthenticated,  deleteAppointment) 
export default router
