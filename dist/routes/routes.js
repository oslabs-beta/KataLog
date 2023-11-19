"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logController_1 = __importDefault(require("../controllers/logController"));
const userController_1 = __importDefault(require("../controllers/userController"));
const projectController_1 = __importDefault(require("../controllers/projectController"));
const authController_1 = __importDefault(require("../controllers/authController"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// user routes:
router.post('/signup', userController_1.default.createUser, (req, res) => {
    res.status(201).json({ message: 'Signed Up' });
});
router.post('/login', userController_1.default.loginUser, (req, res) => {
    res.status(200).json({ message: 'Logged In' });
});
// project routes:
router.get('/projects', authController_1.default.protect, projectController_1.default.getProjects, (req, res) => {
    res.status(200).json({ message: 'Projects' });
});
router.post('/projects', authController_1.default.protect, projectController_1.default.createProject, (req, res) => {
    res.status(200).json({ message: 'Project Added' });
});
router.delete('/projects/:id', authController_1.default.protect, projectController_1.default.deleteProject, (req, res) => {
    res.status(200).json({ message: 'Project Deleted' });
});
// log routes:
// router.get('/logs', logController.parseLogs, (req, res) => {
//     console.log('/logs GET request has fired!');
//     res.status(200).json(res.locals.data);
// });
router.get('/logs/:selectedProject', logController_1.default.getLogs, (req, res) => {
    console.log('getting logs...');
    res.status(200).json(res.locals.logs);
});
exports.default = router;
