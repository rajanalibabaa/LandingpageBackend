import dotenv from 'dotenv';
import twilio from 'twilio';
dotenv.config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN,);
const senderWhatsAppNumber=process.env.TWILIO_PHONE_NUMBER
// Send OTP via WhatsApp
const sendWhatsAppOTP = async (phoneNumber,otp) => {
  console.log("Sending OTP via WhatsApp to:", phoneNumber)
  try {
    const message = await client.messages.create({
      from: 'whatsapp:' + senderWhatsAppNumber,
      to: `whatsapp:${phoneNumber}`,
      contentSid: process.env.TWILIO_TEMPLATE_SID, // your approved template SID
      channel: 'whatsapp',
      contentVariables: JSON.stringify({
        // Your template variables if required
        "1": otp     
       })
    });

    console.log('Message SID:', message.sid);
    console.log(otp);
    
    return message;
  } catch (error) {
    console.error('Error sending WhatsApp template:', error);
    throw error;
  }
};

  
//   return client.verify.v2.services(process.env.TWILIO_SERVICE_SID)

//     .verifications
//     .create({
//       from: `whatsapp:${senderWhatsAppNumber}`,
//       to: `whatsapp:${phoneNumber}`,
//       body:"",
//       contentSid:'HXdc76d37b0ecd6e9370a26dfc25864e71',
//       // contentVariables: JSON.stringify(templateParams),
//       channel: 'whatsapp'
//     })
//     .then(message => console.log(message.sid))
//     .catch(error => console.error(error));
// };



export default sendWhatsAppOTP;
