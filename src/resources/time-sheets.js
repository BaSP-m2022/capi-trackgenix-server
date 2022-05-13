import express from 'express';

const fs = require('fs');
const timeSheets = require('../data/time-sheets.json');

const router = express.Router();

// GET methods
// Return all timeSheets
router.get('/', (req, res) => res.status(200).send(timeSheets));

// Return the timeSheet with the given ID
router.get('/:id', (req, res) => {
  const sheet = timeSheets.find((findSheet) => findSheet.id === parseInt(req.params.id, 10));

  if (!sheet) {
    return res.status(404).send('The timesheet with the given ID was not found');
  }
  return res.send(sheet);
});

// POST method
// Return the timeSheet created
router.post('/', (req, res) => {
  const { body } = req;
  const find = timeSheets.find((findSheet) => findSheet.id === parseInt(body.id, 10));
  const index = timeSheets.indexOf(find);

  if (!body.id || !body.idEmployee || !body.hoursWorked || !body.dailyHS) {
    return res.status(404).send('The data is not correct');
  }
  if (index !== -1) { // Se puede mejorar u optimizar?
    return res.status(404).send('The time sheets already exist');
  }
  const sheet = {
    id: body.id,
    idEmployee: body.idEmployee,
    hoursWorked: body.hoursWorked,
    dailyHS: body.dailyHS,
  };

  timeSheets.push(sheet);
  fs.writeFile('src/data/time-sheets.json', JSON.stringify(timeSheets), (err) => {
    if (err) {
      return res.send(err);
    }
    return res.send('TimeSheet created');
  });
  return res.send(`${sheet}`);
});

// PUT method
// eslint-disable-next-line consistent-return
router.put('/edit/:id', (req, res) => {
  const { body } = req;
  const sheet = timeSheets.find((c) => c.id === parseInt(req.params.id, 10));
  if (body.hoursWorked === null || body.dailyHS === null || !sheet) {
    return res.status(404).send('The data is not correct');
  }
  const index = timeSheets.indexOf(sheet);
  timeSheets[index].hoursWorked = body.hoursWorked;
  timeSheets[index].dailyHS = body.dailyHS;
  fs.writeFile('src/data/time-sheets.json', JSON.stringify(timeSheets), (err) => {
    if (err) {
      res.send(err);
    } else {
      res.send('TimeSheet created');
    }
  });
});

// DELETE method
// eslint-disable-next-line consistent-return
router.delete('/del/:id', (req, res) => {
  const sheet = timeSheets.find((c) => c.id === parseInt(req.params.id, 10));

  if (!sheet) {
    return res.status(404).send('The timesheet with the given ID was not found');
  }
  const index = timeSheets.indexOf(sheet);
  timeSheets.splice(index, 1);

  fs.writeFile('src/data/time-sheets.json', JSON.stringify(timeSheets), (err) => {
    if (err) {
      res.send(err);
    } else {
      res.send('TimeSheet edited');
    }
  });
});

// Filter by id
router.get('/getByHours/:id', (req, res) => {
  const byHours = timeSheets.filter((find) => find.dailyHS === parseInt(req.params.id, 10));
  if (byHours.length === 0) res.status(404).json('No employee worked this amount of Hs');
  res.status(200).json(byHours);
});

export default router;
