import logController from "../controllers/logController";
import userController from "../controllers/userController";
import projectController from "../controllers/projectController";
import authController from "../controllers/authController";
import express from 'express';
import { log } from "console";

const router = express.Router();

// user routes:

router.post('/signup', userController.createUser, (req, res) => {
  res.status(201).json({ message: 'Signed Up' })
});

router.post('/login', userController.loginUser, (req, res) => {
  res.status(200).json({ message: 'Loggged In' })
});

// project routes:

router.get('/projects', authController.protect, projectController.getProjects, (req, res) => {
  res.status(200).json({ message: 'Projects' });
});

router.post('/projects', authController.protect, projectController.createProject, (req, res) => {
  res.status(200).json({message: 'Project Added' });
});

router.delete('/projects/:id', authController.protect, projectController.deleteProject, (req, res) => {
  res.status(200).json({message: 'Project Deleted' });
});

// log routes:

// router.get('/logs', logController.parseLogs, (req, res) => {
//     console.log('/logs GET request has fired!');
//     res.status(200).json(res.locals.data);
// });

router.get('/getProjectLogs', logController.getLogs, (req, res) => {
  console.log('getProjectLogs has fired');
  res.status(200).json(res.locals.projectLogs);
});

router.get('/logs/:selectedProject', logController.getLogs, (req, res) => {
  console.log('getting logs...');
  res.status(200).json(res.locals.logs);
});

// router.post('/createlog', logController.parseLogs, logController.addLog, (req, res) => {
//   res.status(200).json(res.locals.log);
// });

router.post('/createlog', logController.addLog, (req, res) => {
  res.status(200).json(res.locals.log);
});

export default router;