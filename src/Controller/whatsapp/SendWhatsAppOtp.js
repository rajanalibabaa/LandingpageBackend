import { generateOTP } from "../../Utils/generateOTP.js";
import sendWhatsappTwiloOtp from "../../Utils/sendWhatsappTwiloOtp.js";

const sendOTPController = async (req, res) => {
  const { phoneNumber } = req.body;

  if (!phoneNumber) {
    return res.status(400).json({ success: false, message: "Phone number is required" });
  }
const otp =generateOTP();
  try {
    const response = await sendWhatsappTwiloOtp(phoneNumber,otp);
    res.status(200).json({ success: true, message: "OTP sent via WhatsApp", data: {sid:response.sid,otp} });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to send OTP", error: error.message });
  }
};

// Verify WhatsApp OTP Controller
export default sendOTPController