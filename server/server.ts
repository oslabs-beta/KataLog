import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './routes/routes'
import dotenv from 'dotenv';
import chokidar from 'chokidar';
import fs from 'fs';
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


chokidar.watch('/Users/charlesfrancofranco/Downloads/logs').on('add', path => {
  console.log('found new file located at ', path);
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});