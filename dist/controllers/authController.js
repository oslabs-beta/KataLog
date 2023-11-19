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
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            // Ensure the JWT_SECRET is defined or throw an error
            if (!process.env.JWT_SECRET) {
                throw new Error('JWT secret not defined');
            }
            const jwtSecret = process.env.JWT_SECRET;
            // Verify the token
            const decoded = jsonwebtoken_1.default.verify(token, jwtSecret);
            if (typeof decoded !== 'object' || !decoded.id) {
                throw new Error('Invalid token');
            }
            req.user = yield userModel_1.default.findById(decoded.id).select('-password');
            return next();
        }
        catch (error) {
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
});
exports.default = authController;
