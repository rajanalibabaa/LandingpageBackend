import jwt from 'jsonwebtoken';

// Function to generate a JWT token
export const generateToken = (payload, secretKey, expiresIn) => {
    if (!secretKey) {
        throw new Error('JWT_SECRET is not defined in the environment variables');
    }
    const token = jwt.sign(payload, secretKey, { expiresIn });
    return token;
    console.log(`Token generated: ${token}`);
    
};

// Function to verify a JWT token
  const verifyToken = (token, secretKey) => {
    try {
        return jwt.verify(token, secretKey);
    } catch (error) {
        throw new Error('Invalid or expired token');
    }
};

export default verifyToken;


