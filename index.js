import dotenv from 'dotenv';
dotenv.config(); // Load .env file first

import express from 'express';
import cors from 'cors';
import appRouter from './app.js';
import connectDB from "./src/Database/database.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('✅ API is working');
});
app.use('/api', appRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});