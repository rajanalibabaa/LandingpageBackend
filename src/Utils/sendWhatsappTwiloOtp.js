import dotenv from 'dotenv';
import twilio from 'twilio';
dotenv.config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN,);
const senderWhatsAppNumber=process.env.TWILIO_PHONE_NUMBER
// Send OTP via WhatsApp
const sendWhatsAppOTP = async (phoneNumber) => {
  console.log("Sending OTP via WhatsApp to:", phoneNumber)
  
  return client.verify.v2.services(process.env.TWILIO_SERVICE_SID)

    .verifications
    .create({
      from: `whatsapp:${senderWhatsAppNumber}`,
      to: `whatsapp:${phoneNumber}`,
      channel: 'whatsapp'
    })
    .then(message => console.log(message.sid))
    .catch(error => console.error(error));
};



export default sendWhatsAppOTP;
