/* eslint-disable no-undef */
/* eslint-disable arrow-parens */
// const exp = require('constants');
const express = require('express');
const fs = require('fs');
// const path = require('path');
const timeSheets = require('../data/time-sheets.json');

// const allSheets = JSON.parse(timeSheets);

const router = express.Router();

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

// Filter GET method

router.get('/getByHour', (req, res) => {
  const tsData = parseInt(req.query.dailyHS, 10);
  const wantedData = timeSheets.filter((md) => md.dailyHS === tsData);
  if (!wantedData.length > 0) res.status(404).json('No employee worked this amount of Hs');
  res.status(200).json(wantedData);
});

module.exports = router;
