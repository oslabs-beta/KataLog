import jwt from 'jsonwebtoken';
import User from '../models/userModel';

const authController : any = {};

authController.protect = async (req, res, next) => {
  // initialize a variable token
  let token;
  // check if authorization object on HTTP headers exists and that is starts with 'Bearer' (format of auth header is 'Bearer token')
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    try {
      // reassign token variable to token value from header (split by spaces, as auth header format is 'Bearer token')
      token = req.headers.authorization.split(' ')[1];
      // verify token using verify method native to jwt - pass in token and jwt secret
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      // grab user id from decoded token (token has user id as payload), assign to req.user
      // can access req.user in protected routes
      req.user = await User.findById(decoded.id).select('-password');
      // return invocation next
      return next();
    // if authorization process fails
    } catch (error) {
      // console log error
      console.log(error);
      // invoke global error handler
      return next({
        // set status of 401 (unauthorized response)
        status: 401,
        log: 'authController.protect',
        // user not authorized
        message: { err: 'User not authorized' }, 
      }); 
    }
  }

  // if token not present in headers (i.e. token is still null)
  if (!token){
    // invoke global error handler
    return next({
      // set status of 401 (unauthorized response)
      status: 401,
      log: 'authController.protect',
      // user not authorized; no token
      message: { err: 'User not authorized; no token' }, 
    }); 
  }
}

export default authController;