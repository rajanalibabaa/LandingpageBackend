import nodemailer from 'nodemailer';
import fs from 'fs';
import handlebars from 'handlebars';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Get __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configure mail transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
   tls: {
    rejectUnauthorized: false // 👈 This disables certificate validation
  }
});

// Read HTML template and compile with Handlebars
const getTemplate = (templateName, data) => {
  try {
    const filepath = path.join(__dirname, '../Pages', `${templateName}.html`);
    const source = fs.readFileSync(filepath, 'utf-8').toString();
    const template = handlebars.compile(source);
    return template(data);
  } catch (error) {
    console.error('❌ Error while reading or compiling the email template:', error.message);
    throw new Error('Failed to load email template');
  }
};

// Main function to send email
export const sendEmail = async (to, subject, templateName, data) => {
  try {
    const html = getTemplate(templateName, data);
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully to:', to);
  } catch (error) {
    console.error('❌ Error while sending email:', error.message);

 tls: {
    rejectUnauthorized: false // 👈 This disables certificate validation
  }    throw new Error('Failed to send email');
  }
};