

import express from 'express';
import FormRoutes from './src/routes/FormRoutes.js';
import whatsapprouter from "./src/routes/WhatsAppRoutes.js"
import dotenv from 'dotenv';
dotenv.config();
const router = express.Router();

// Example route
router.use ('/form',FormRoutes);
router.use('/whatsapp',whatsapprouter)


export default router;