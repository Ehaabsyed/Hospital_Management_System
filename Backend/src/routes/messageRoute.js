import express from "express";
import {sendMessage,getallMessages} from "../controllers/messageController.js";    
import { isAdminauthenticated, isPatientauthenticated } from "../middlewares/auth.js";
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Message route is working");
});
router.post("/send",isPatientauthenticated, sendMessage)
router.get("/getallmessages",isAdminauthenticated, getallMessages)





export default router;