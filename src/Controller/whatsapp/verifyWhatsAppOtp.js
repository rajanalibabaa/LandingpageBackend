import verifyWhatsAppOTP from "../../Utils/verifyWhatsappTwilio.js";

const verifyOTPController = async (req, res) => {
    const { phoneNumber, otpCode } = req.body;
  
    if (!phoneNumber || !otpCode) {
      return res.status(400).json({ success: false, message: "Phone number and OTP code are required" });
    }
  
    try {
      const verificationResult = await verifyWhatsAppOTP(phoneNumber, otpCode);
  
      if (verificationResult.status === "approved") {
        res.status(200).json({ success: true, message: "OTP verified successfully" });
      } else {
        res.status(401).json({ success: false, message: "Incorrect OTP" });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: "OTP verification failed", error: error.message });
    }
  };
  
  export default verifyOTPController;