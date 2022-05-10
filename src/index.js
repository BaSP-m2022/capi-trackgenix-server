// use "import" to import libraries
import express from 'express';
import adminsRouter from './resources/admins';
import projectsRouter from './resources/projects';

// use "require" to import JSON files
const admins = require('./data/admins.json');

const app = express();
const port = process.env.PORT || 3000;

app.set('json spaces', 2);
app.use(express.json());
app.use('/admins', adminsRouter);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/projects', projectsRouter);

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.get('/admins', (req, res) => {
  res.status(200).json({
    data: admins,
  });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/time-sheets', require('./resources/time-sheets'));
