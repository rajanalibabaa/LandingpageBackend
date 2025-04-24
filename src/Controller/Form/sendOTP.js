import { generateOTP } from "../../Utils/generateOTP.js";
import { generateToken } from "../../Utils/generateToken.js";
import { sendEmail } from "../../Utils/sendEmailOTP.js";

  const OTP = generateOTP();

export const sendOTP = async (req, res) => {
    const { type, identifier } = req.body;

    console.log("Sending OTP to:", identifier, "Type:", type);

    // Validate required fields
    if (!type || !identifier) {
        return res.status(400).json({ error: "Type and identifier are required" });
    }

    // Generate OTP and token
    const generatedOtp = generateOTP();
    const generatedToken = generateToken(
        { identifier, otp: generatedOtp },
        process.env.JWT_SECRET,
        "5m" // Token expires in 5 minutes
    );

    console.log("Generated OTP:", generatedOtp);
    console.log("Generated Token:", generatedToken);

    try {
        if (type === "email") {
            // Use the sendEmail function to send the OTP email
            await sendEmail(
                identifier,
                "Your OTP Code",
                "emailTemplate", // Template name without extension
                { OTP: generatedOtp } // Data to populate the template
            );
        } else {
            return res.status(400).json({ error: "Invalid type" });
        }

        return res.status(200).json({ message: "OTP sent successfully", token: generatedToken });
    } catch (error) {
        console.error("Error while sending OTP:", error.message);
        return res.status(500).json({ error: "Failed to send OTP", details: error.message });
    }
};