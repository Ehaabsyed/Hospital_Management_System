import express from "express";
import { createUser,createDoctor } from "../controllers/userController.js";
import { get } from "mongoose";
import { getallDoctors } from "../controllers/doctorController.js";
import { isAdminauthenticated } from "../middlewares/auth.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Doctor route is working");
});



router.post("/register",isAdminauthenticated, createDoctor)  
router.get("/getalldoctors",getallDoctors)  

export default router
