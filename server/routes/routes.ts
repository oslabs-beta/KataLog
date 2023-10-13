// import express
import express from 'express';
// import logController
import logController from '../controllers/logController';
import userController from '../controllers/userController';
import projectController from '../controllers/projectController';

const router = express.Router();

// route handler for getting and parsing logs
router.get('/api/logs', logController.parseLogs, (req, res) => {
    console.log('/logs GET request has fired!');
    console.log('res.locals.data', res.locals.data);
    res.status(200).json(res.locals.data);
});

router.post('/api/createuser', userController.createUser, (req, res) => {
  res.status(200).json(res.locals.user);
});

router.post('/api/createproject', projectController.addProject, (req, res) => {
  res.status(200).json(res.locals.project);
});

router.post('/api/createlog', logController.parseLogs, logController.addLog, (req, res) => {
  res.status(200).json(res.locals.log);
});

export default router;