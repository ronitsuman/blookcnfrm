// src/integrations/database/dbConnect.js
import mongoose from 'mongoose';
import { loadEnv } from '../../shared/config/env.js';

loadEnv();

const MONGODB_URI = process.env.MONGODB_URI;

const dbConnect = async (retries = 5, delay = 5000) => {
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined in environment variables');
  }

  for (let i = 0; i < retries; i++) {
    try {
      await mongoose.connect(MONGODB_URI, {
        
        serverSelectionTimeoutMS: 5000,
      });
      console.log('MongoDB Atlas connected successfully');
      return;
    } catch (err) {
      console.error(`MongoDB connection attempt ${i + 1} failed: ${err.message}`);
      if (i < retries - 1) {
        console.log(`Retrying in ${delay / 1000} seconds...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        console.error('Max retries reached. Unable to connect to MongoDB.');
        throw err;
      }
    }
  }
};

export default dbConnect;