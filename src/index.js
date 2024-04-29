import express from 'express';
import morgan from 'morgan';

import Router from './router/index.js';

import { config } from 'dotenv';
import db from './config/db.js';

config();
const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  return res.status(200).json({ message: 'home page' });
});

try {
  db();
  app.use('/api', Router);
  app.listen(port, () => {
    console.log(` App is running on port ${port}`);
  });
} catch (err) {
  console.error(err.message);
}
