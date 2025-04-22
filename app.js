

import express from 'express';
import FormRoutes from './src/routes/FormRoutes.js';
import dotenv from 'dotenv';
dotenv.config();
const router = express.Router();

// Example route
router.use ('/form',FormRoutes);


export default router;