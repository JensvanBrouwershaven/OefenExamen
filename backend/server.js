
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import imageRoutes from './Routes/Imagerouter.js';
import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config()
// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());  // To parse JSON in request body

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Use built-in CommonJS __dirname
// Make the 'uploads' folder accessible via HTTP
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const mongoURI = process.env.MONG_URI;
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log('✅ Verbonden met MongoDB');
    // Luister naar de poort
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`🚀 Server draait op http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('❌ Fout bij verbinden met MongoDB:', err);
  });


app.use('/api/images', imageRoutes);

// Start the server

