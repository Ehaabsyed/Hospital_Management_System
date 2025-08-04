import express from "express";
import { sendInfo } from "../controllers/infoController.js";
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Info route is working");
});
router.get("/send",sendInfo)





export default router;