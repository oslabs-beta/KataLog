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
const userModel_1 = __importDefault(require("../models/userModel"));
const authController = {};
authController.protect = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // initialize a variable token
    let token;
    // check if authorization object on HTTP headers exists and that is starts with 'Bearer' (format of auth header is 'Bearer token')
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // reassign token variable to token value from header (split by spaces, as auth header format is 'Bearer token')
            token = req.headers.authorization.split(' ')[1];
            // verify token using verify method native to jwt - pass in token and jwt secret
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            // grab user id from decoded token (token has user id as payload), assign to req.user
            // can access req.user in protected routes
            req.user = yield userModel_1.default.findById(decoded.id).select('-password');
            // return invocation next
            return next();
            // if authorization process fails
        }
        catch (error) {
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
    if (!token) {
        // invoke global error handler
        return next({
            // set status of 401 (unauthorized response)
            status: 401,
            log: 'authController.protect',
            // user not authorized; no token
            message: { err: 'User not authorized; no token' },
        });
    }
});
exports.default = authController;
