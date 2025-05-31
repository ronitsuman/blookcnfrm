// src/config/env.js
import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  PORT: z.string().default('5000').transform(Number),
  MONGODB_URI: z.string().url(),
  GOOGLE_MAPS_API_KEY: z.string().min(1),
  CLOUDINARY_CLOUD_NAME: z.string().min(1),
  CLOUDINARY_API_KEY: z.string().min(1),
  CLOUDINARY_API_SECRET: z.string().min(1),
  JWT_SECRET: z.string().min(32),
  EMAIL_USER: z.string().email(),
  EMAIL_PASS: z.string().min(1),
  CORS_ORIGIN: z.string().optional(),
});

export const loadEnv = () => {
  try {
    envSchema.parse(process.env);
  } catch (err) {
    console.error('Environment variable validation failed:', err.errors);
    process.exit(1);
  }
};