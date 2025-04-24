import nodemailer from 'nodemailer';
import fs from 'fs';
import handlebars from 'handlebars';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';
import { generateOTP } from '../Utils/generateOTP.js';

const otp=generateOTP();

// Load environment variables
dotenv.config();

// Get __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configure mail transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.sender_mail,
    pass: process.env.sender_password
  }
});

// Read HTML template and compile with Handlebars
const getTemplate = (templateName, data) => {
  const filepath = path.join(__dirname, '../Pages/emailTemplate', `${templateName}.html`);
  const source = fs.readFileSync(filepath, 'utf-8').toString();
  const template = handlebars.compile(source);
  return template(data);
};

// Main function to send email
export const sendEmail = async (to, subject, templateName, data) => {
  try {
    const html = getTemplate(templateName, data);
    const mailOptions = {
      from: process.env.sender_mail,
      to,
      subject,
      html
    };

    emailChecker(to, mailOptions); // Optional pre-check
    await transporter.sendMail(mailOptions);

    console.log('✅ Email sent successfully to:', to);
  } catch (error) {
    console.error('❌ Error while sending email:', error.message);
  }
};

// Example usage
// const otp = generateOTP();
// sendEmail("user@example.com", "Verify Your OTP", "otpTemplate", { otp });
