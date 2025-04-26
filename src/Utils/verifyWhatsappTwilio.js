import dotenv from 'dotenv';
import twilio from 'twilio';
dotenv.config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);



// Verify WhatsApp OTP
const verifyWhatsAppOTP = async (phoneNumber, otpCode) => {
    return client.verify.v2.services(process.env.TWILIO_SERVICE_SID)

      .verificationChecks
      .create({
        to: `whatsapp:${phoneNumber}`,
        code: otpCode
      });
  };

  export default verifyWhatsAppOTP 