import User from '../models/userModel';

const userController : any = {};

userController.createUser = async (req, res, next) => {


  console.log(req);

  console.log(req.body)

  const { username, password, email } = req.body;

  try {
    const user = await User.create({username, password, email})
    .then((data) => {
      res.locals.user = data;
      res.locals.user_id = data._id;
    });
    return next();
  } catch (error) {
    return next(error);
  };
};

// userController.verifyUser = async (req, res, next) => {

//   const { username, password } = req.body;

//   try {
//     const user = await models.User.findOne({username: username, password: password})
//     if (user) {
//       res.locals.user_id = user._id;
//       return next();
//     } else res.redirect('/signup');
//   } catch (error) {
//     return next(error);
//   };
// };

export default userController;