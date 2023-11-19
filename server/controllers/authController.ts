import jwt, { Secret } from 'jsonwebtoken';
import User from '../models/userModel';

const authController: any = {};

authController.protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      // Ensure the JWT_SECRET is defined or throw an error
      if (!process.env.JWT_SECRET) {
        throw new Error('JWT secret not defined');
      }

      const jwtSecret: Secret = process.env.JWT_SECRET;

      // Verify the token
      const decoded = jwt.verify(token, jwtSecret);
      if (typeof decoded !== 'object' || !decoded.id) {
        throw new Error('Invalid token');
      }

      req.user = await User.findById(decoded.id).select('-password');
      return next();
    } catch (error) {
      console.log(error);
      return next({
        status: 401,
        log: 'authController.protect',
        message: { err: 'User not authorized' },
      });
    }
  }

  if (!token) {
    return next({
      status: 401,
      log: 'authController.protect',
      message: { err: 'User not authorized; no token' },
    });
  }
};

export default authController;
