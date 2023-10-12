import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// load our .env file
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.get('/ping', (_, res) => {
  res.status(200).send('Pong!');
});

app.get('/book', async (_, res) => {
  res.sendStatus(200);
});
