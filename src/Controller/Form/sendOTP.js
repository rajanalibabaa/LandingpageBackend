import { generateOTP } from "../../Utils/generateOTP.js";
import { generateToken } from "../../Utils/generateToken.js";
import { sendEmailOTP } from "../../Utils/sendEmailOTP.js";
import { sendMobileSMS } from "../../Utils/sendTwilio.js";


    export const sendOTP = async (req, res) => {

        const { type, identifier } = req.body;
    
    
        console.log("Sending OTP to:", identifier, "Type:", type);
        
    
        // Validate required fields
        if (!type || !identifier) {
            return res.status(400).json({ error: "Type and identifier are required" });
        }
    
        // Generate OTP and token
        const generatedOtp = generateOTP();
        const generatedToken = generateToken({ identifier, otp: generatedOtp }, process.env.JWT_SECRET , "5m"); // Token expires in 5 minutes

        console.log("Generated OTP:", generatedOtp);
        console.log("Generated Token:", generatedToken);
        
    
        try {
            if (type === "email") {
                await sendEmailOTP(identifier, generatedOtp);
            } else if (type === "mobile") {
                await sendMobileSMS(identifier, generatedOtp);
            } else {
                return res.status(400).json({ error: "Invalid type" });
            }
    
            return res.status(200).json({ message: "OTP sent successfully", token: generatedToken });
        } catch (error) {
            return res.status(500).json({ error: "Failed to send OTP", details: error.message });
        }
    };
    




