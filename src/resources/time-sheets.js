// const exp = require('constants');
const express = require('express');
const fs = require('fs');
// const path = require('path');
const timeSheets = require('../data/time-sheets.json');

const router = express.Router();

// PUT method
// eslint-disable-next-line consistent-return
router.put('/edit/:id', (req, res) => {
  const { body } = req;
  const sheet = timeSheets.find((c) => c.id === parseInt(req.params.id, 10));

  if (body.hoursWorked === null || body.dailyHs === null) {
    return res.status(404).send('The data is not correct');
  }
  sheet.hoursWorked = body.hoursWorked;
  sheet.dailyHs = body.dailyHs;

  timeSheets.push(sheet);
  fs.writeFile('src/data/time-sheets.json', JSON.stringify(timeSheets), (err) => {
    if (err) {
      res.send(err);
    } else {
      res.send('TimeSheet edited');
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

module.exports = router;
