import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './routes/routes';
import path from 'path';
import { Server as WebSocketServer } from 'ws';

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '../public')));


const mongoURI : any = process.env.MONGO_URI;

mongoose.connect(mongoURI);
mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});




app.use('/api', router);

app.get('*', (req, res) => {
  return res.sendFile(path.join(__dirname, '../public/index.html'));
});


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

const server = app.listen(3000, () => {
  console.log('Server running on port 3000');
});


const wss = new WebSocketServer({ server });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  // Send a JSON stringified message
  const data = { message: 'something' };
  ws.send(JSON.stringify(data));
});

export default app;