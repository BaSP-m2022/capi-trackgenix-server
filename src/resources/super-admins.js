const express = require('express');
const fs = require('fs');
const superAdmins = require('../data/super-admins.json');

const router = express.Router();

router.get('/getAll', (req, res) => {
  res.status(200).json({
    data: superAdmins,
  });
});

router.get('/getById/:id', (req, res) => {
  const superId = req.params.id;
  const superAdmin = superAdmins.find((superAdm) => superAdm.id === superId);
  if (superAdmin) {
    res.send(superAdmin);
  } else {
    res.send('Super Admin not found');
  }
});

router.get('/getByEmail/:email', (req, res) => {
  const superEmail = req.params.email;
  const superAdmin = superAdmins.find((superAdm) => superAdm.email === superEmail);
  if (superAdmin) {
    res.send(superAdmin);
  } else {
    res.status(400).json({ msg: 'Super Admin not found' });
  }
});

router.post('/add', (req, res) => {
  const superData = req.body;
  superAdmins.push(superData);
  fs.writeFile('src/data/super-admins.json', JSON.stringify(superAdmins), (err) => {
    if (err) {
      res.send(err);
    } else {
      res.send('Super Admin added');
    }
  });
});

module.exports = router;
