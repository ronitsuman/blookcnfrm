// src/server.js
import app from './app.js';
import dbConnect from './integrations/database/dbconnect.js';
import { loadEnv } from './shared/config/env.js';

loadEnv();

const PORT =  5000 || process.env.PORT;

const startServer = async () => {
  try {
    await dbConnect();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err.message);
    process.exit(1);
  }
};

startServer();
