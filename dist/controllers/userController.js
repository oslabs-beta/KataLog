"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userModel_1 = __importDefault(require("../models/userModel"));
const userController = {};
// createUser middleware - create a user in the database
userController.createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // deconstruct request body
    const { username, email, password } = req.body;
    // if username, email, or password not provided
    if (!username || !email || !password) {
        // invoke global error handler
        return next({
            log: 'userController.createUser',
            // ask user to provide all fields
            message: { err: 'Please provide all required fields' },
        });
    }
    // see if user already exists in database (search for username and email - both should be unique)
    const userExists = yield userModel_1.default.findOne({ $or: [{ username }, { email }] });
    // if userExists is not null (user exists already)
    if (userExists) {
        // invoke global error handler
        return next({
            log: 'userController.createUser',
            // ask user to login
            message: { err: 'User already exists - please login' },
        });
    }
    // if user doesn't already exist, hash password
    const SALT_WORK_FACTOR = 10;
    const hashedPassword = yield bcryptjs_1.default.hash(password, SALT_WORK_FACTOR);
    // create user in database
    const createdUser = yield userModel_1.default.create({ username, email, password: hashedPassword });
    // if createdUser is not null (i.e. user creation was successful)
    if (createdUser) {
        // return status of 201 (successful creation) along with user information and jwt token
        return res.status(201).json({
            _id: createdUser.id,
            username: createdUser.username,
            email: createdUser.email,
            token: generateToken(createdUser._id)
        });
        // else (i.e. user creation failed)
    }
    else {
        // invoke global error handler
        return next({
            log: 'userController.createUser',
            // user creation failed
            message: { err: 'User creation failed' },
        });
    }
});
// loginUser middleware - verify a user
userController.loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // deconstruct request body
    const { username, password } = req.body;
    // if username or password not provided
    if (!username || !password) {
        // invoke global error handler
        return next({
            log: 'userController.loginUser',
            // ask user to provide all fieldsc
            message: { err: 'Please provide all required fields' },
        });
    }
    // see if user exists in database (search for username - should be unique)
    const userExists = yield userModel_1.default.findOne({ username });
    // if userExists is not null (i.e. user exists in database) and password inputted by user matches hashed password in database after comparison
    if (userExists && (yield bcryptjs_1.default.compare(password, userExists.password))) {
        // return status of 200 along with user information and jwt token
        return res.status(200).json({
            _id: userExists.id,
            username: userExists.username,
            email: userExists.email,
            token: generateToken(userExists._id)
        });
        // else (i.e. user login unsuccessful - could be due to incorrect username or non-matching password)
    }
    else {
        // invoke global error handler
        return next({
            log: 'userController.loginUser',
            // invalid credentials
            message: { err: 'Invalid credentials' },
        });
    }
});
// generate JWT - define a function generateToken that has 1 param - id
const generateToken = id => {
    // return invocation of jwt.sign, passing in id, JWT_SECRET, and expiresIn (30 minutes)
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30m' });
};
exports.default = userController;
