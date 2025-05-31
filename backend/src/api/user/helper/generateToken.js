import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const generateToken = (user) => {
    return jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'your_jwt_secret', // Use environment variable in production
      { expiresIn: '1d' } // Token expires in 1 day
    );
  }; 

  export default generateToken
;