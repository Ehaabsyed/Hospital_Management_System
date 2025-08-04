import express from "express";
import { addAdmin, getall } from "../controllers/userController.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Admin route is working");
});



router.post("/register",addAdmin)  
router.get("/getall",getall)  

export default router
