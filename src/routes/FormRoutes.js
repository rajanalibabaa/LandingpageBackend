import express from "express";
import { sendOTP } from "../Controller/Form/sendOTP.js";
import { verifyOTP } from "../Controller/Form/verifyOTP.js";
const router=express.Router();


router.post("/send-otp",sendOTP)
router.post("/verify-otp",verifyOTP)






export default router  