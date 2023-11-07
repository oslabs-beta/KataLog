import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './routes/routes'
import chokidar from 'chokidar';
import fs from 'fs';
import path from 'path';
import logController from './controllers/logController';

dotenv.config();

const app = express();
// const APP_NAME = Update/Based/On/User/Input;
// const LOG_DIR = Update/Based/On/User/Input;
// let currentFilePath = `${LOG_DIR}/${APP_NAME}.log.txt`; // initial file reliant on user input
// let filePointer = 0;

app.use(cors()); // Enable CORS for all routes
// parse body requests from JSON to JS
app.use(express.json());
// parse URL encoded data requests into req.body
app.use(express.urlencoded({ extended: true }));

const mongoURI : any = process.env.MONGO_URI;

mongoose.connect(mongoURI);
mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});

app.use('/api', router);

// const watcher = chokidar.watch('/Users/charlesfrancofranco/Downloads/logs/', {
//   ignored: /(^|[\/\\])\..|buffer|%Y%m%d/,
//   persistent: true
// });

// watcher.on('all', (event, filePath) => {
//   if (fs.statSync(filePath).isFile() && path.extname(filePath) === '.log') {
//   // console.log('found new file located at ', filePath);
//   // console.log(typeof filePath);
//   logController.parseLogDirectory(filePath);
//   }
// });

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' }, 
  };
  const errorObj = Object.assign(defaultErr, err);
  console.log(errorObj);
  return res.status(errorObj.status).send(errorObj.message);
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});