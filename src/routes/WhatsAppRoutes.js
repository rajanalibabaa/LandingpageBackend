import express from 'express';
import verifyOTPController from '../Controller/whatsapp/verifyWhatsAppOtp.js';
import sendOTPController from '../Controller/whatsapp/SendWhatsAppOtp.js';

const router = express.Router();


// POST: Send OTP
router.post('/send-otp',sendOTPController);

// POST: Verify OTP
router.post('/verify-otp', verifyOTPController);


export default router
