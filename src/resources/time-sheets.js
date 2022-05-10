// const exp = require('constants');
const express = require('express');
const fs = require('fs');
// const path = require('path');
const timeSheets = require('../data/time-sheets.json');

const router = express.Router();

// GET method
router.get('/', (req, res) => res.status(200).send(timeSheets));

router.get('/:id', (req, res) => {
  const sheet = timeSheets.find((c) => c.id === parseInt(req.params.id, 10));

  if (!sheet) {
    return res.status(404).send('The timesheet with the given ID was not found');
  }
  return res.send(sheet);
});

// POST method
// eslint-disable-next-line consistent-return
router.post('/', (req, res) => {
  const { body } = req;
  // eslint-disable-next-line max-len
  if (body.id === null || body.idEmployee === null || body.hoursWorked === null || body.dailyHs === null) {
    return res.status(404).send('The data is not correct');
  }
  const sheet = {
    id: body.id,
    idEmployee: body.idEmployee,
    hoursWorked: body.hoursWorked,
    dailyHs: body.dailyHs,
  };

  timeSheets.push(sheet);
  fs.writeFile('src/data/time-sheets.json', JSON.stringify(timeSheets), (err) => {
    if (err) {
      res.send(err);
    } else {
      res.send('TimeSheet created');
    }
  });
});

module.exports = router;
