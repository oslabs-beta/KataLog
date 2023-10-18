// import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './routes/routes'
import dotenv from 'dotenv';
import fs from 'fs';
import logController from './controllers/logController';
const express = require('express');

dotenv.config();
const app = express();
const APP_NAME = 'my-app-copy';
const LOG_DIR = "/Users/charlesfrancofranco/Downloads/logs";
let currentFilePath = `${LOG_DIR}/${APP_NAME}.log.txt`; // initial file.
let filePointer = 0;

app.use(cors()); // Enable CORS for all routes
app.use(express.json());

const mongoURI : any = process.env.MONGO_URI;

mongoose.connect(mongoURI);
mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});

app.use('/', router);

// Start file watching as soon as the server starts
// fs.watch(LOG_DIR, (eventType, filename) => {
//     if (eventType === 'rename' && filename.includes(APP_NAME)) {
//         logController.processRemainingEntriesInCurrentFile(currentFilePath, filePointer);
//         currentFilePath = `${LOG_DIR}/${filename}`;
//         filePointer = 0;
//         console.log('found logs!');
//     }
//     filePointer = logController.processNewLogEntries(currentFilePath, filePointer);
// });

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
