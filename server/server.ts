import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './routes/routes';
import dotenv from 'dotenv';
import fs from 'fs';
import logController from './controllers/logController';

dotenv.config();
const app = express();
const APP_NAME = process.env.APP_NAME || 'my-app-copy';
const LOG_DIR = process.env.LOG_DIR || "/fluentd/logs";
let currentFilePath = `${LOG_DIR}/${APP_NAME}.log.txt`;
let filePointer = 0;

app.use(cors());
app.use(express.json());

const mongoURI: string = process.env.MONGO_URI || "YOUR_DEFAULT_MONGO_URI_HERE";

mongoose.connect(mongoURI);
mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});

app.use('/', router);

const checkDirExistence = (path: string, callback: () => void) => {
  let attempts = 0;
  const interval = setInterval(() => {
      if (fs.existsSync(path)) {
          clearInterval(interval);
          callback();
      } else if (attempts > 20) {
          clearInterval(interval);
          console.error(`Failed to find directory: ${path} after multiple checks.`);
      }
      attempts++;
  }, 500);
};

checkDirExistence(LOG_DIR, () => {
  fs.watch(LOG_DIR, (eventType, filename) => {
      if (eventType === 'rename' && filename.includes(APP_NAME)) {
          logController.processRemainingEntriesInCurrentFile(currentFilePath, filePointer);
          currentFilePath = `${LOG_DIR}/${filename}`;
          filePointer = 0;
          console.log('found file!');
      }
      filePointer = logController.processNewLogEntries(currentFilePath, filePointer);
  });
});

// Error Handling Middleware
app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!");
});

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 9002;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
