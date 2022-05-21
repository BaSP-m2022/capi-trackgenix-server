import express from 'express';

require('dotenv').config({ path: './.env' });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

export default app;
