// use "import" to import libraries
import express from 'express';
import * as adminControllers from './resources/admins';

// use "require" to import JSON files
const admins = require('./data/admins.json');

const app = express();
const port = process.env.PORT || 3000;

app.set('json spaces', 2);
app.use(express.json());

app.get('/admins', adminControllers.getAdminsAll);
app.get('/admins/:id', adminControllers.getAdminById);
app.post('/admins/create', adminControllers.createAdmin);

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
