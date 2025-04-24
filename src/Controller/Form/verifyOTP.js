import verifyToken from "../../Utils/generateToken.js";

export const verifyOTP = async (req, res) => {
    const { identifier, otp, token } = req.body;

    // Validate required fields
    if (!identifier || !otp || !token) {
        return res.status(400).json({ error: "Identifier, OTP, and token are required for verification" });
    }

    try {
        // Verify the token
        const decoded = verifyToken(token, process.env.JWT_SECRET);
        console.log("Decoded Token:", decoded);

        // Check if the identifier and OTP match
        if (decoded.identifier === identifier && decoded.otp === otp) {
            return res.status(200).json({ message: "OTP verified successfully" });
        } else {
            return res.status(400).json({ error: "Invalid or expired OTP" });
        }
    } catch (error) {
        console.error("Error verifying OTP:", error);
        return res.status(400).json({ error: "Invalid or expired token" });
    }
};