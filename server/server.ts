import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './routes/routes';
import path from 'express';

dotenv.config();

const app = express();


app.use(cors()); // Enable CORS for all routes
// parse body requests from JSON to JS
app.use(express.json());
// parse URL encoded data requests into req.body
app.use(express.urlencoded({ extended: true }));

app.use(express.static('../src/components/assets'));


const mongoURI : any = process.env.MONGO_URI;

mongoose.connect(mongoURI);
mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});

app.use('/api', router);

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


app.all('*', (req, res) => {
  res.status(404).send('Endpoint not found');
});


app.listen(3000, () => {
    console.log('Server running on port 3000');
});