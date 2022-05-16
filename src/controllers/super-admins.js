const express = require('express');
const fs = require('fs');
const superAdmins = require('../data/super-admins.json');

const router = express.Router();

// get all Super Admins

router.get('/getAll', (req, res) => {
  res.status(200).json({
    data: superAdmins,
  });
});

// getById

router.get('/getById/:id', (req, res) => {
  const supAdm = superAdmins.find((superAdm) => superAdm.id === parseInt(req.params.id, 10));
  if (supAdm) {
    res.send(supAdm);
  } else {
    res.status(400).json({ msg: `No SuperAdmin found with the id: ${req.params.id}` });
  }
});

// getByEmail

router.get('/getByEmail/:email', (req, res) => {
  const superEmail = req.params.email;
  const supAdm = superAdmins.find((superAdm) => superAdm.email === superEmail);
  if (supAdm) {
    res.send(supAdm);
  } else {
    res.status(400).json({ msg: `No SuperAdmin found with the email: ${req.params.email}` });
  }
});

// Add Super Admin

router.post('/add', (req, res) => {
  const superData = req.body;
  superAdmins.push(superData);
  if (superData.id && superData.email && superData.password) {
    fs.writeFile('src/data/super-admins.json', JSON.stringify(superAdmins), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send('Super Admin added');
      }
    });
  }
});

// Edit Super Admin

router.put('/edit/:id', (req, res) => {
  const found = superAdmins.some((superAdmin) => superAdmin.id === parseInt(req.params.id, 10));
  if (found) {
    const updateAdm = req.body;
    superAdmins.forEach((superAdmin) => {
      if (superAdmin.id === parseInt(req.params.id, 10)) {
        // eslint-disable-next-line no-param-reassign
        superAdmin.email = updateAdm.email ? updateAdm.email : superAdmin.email;
        // eslint-disable-next-line no-param-reassign
        superAdmin.password = updateAdm.password ? updateAdm.password : superAdmin.password;
        fs.writeFile('src/data/super-admins.json', JSON.stringify(superAdmins), (err) => {
          if (err) {
            res.send(err);
          } else {
            res.json({ msg: `Super Admin ${req.params.id} was updated` });
          }
        });
      }
    });
  } else {
    res.status(400).json({ msg: `No Super Admin found with the id: ${req.params.id}` });
  }
});

// Delete Super Admin

router.delete('/delete/:id', (req, res) => {
  const found = superAdmins.some((superAdmin) => superAdmin.id === parseInt(req.params.id, 10));
  if (found) {
    const result = superAdmins.filter((superAdm) => superAdm.id !== parseInt(req.params.id, 10));
    fs.writeFile('src/data/super-admins.json', JSON.stringify(result), (err) => {
      if (err) throw err;
    });
    res.json({ msg: `SuperAdmin ${req.params.id} deleted` });
  } else {
    res.status(400).json({ msg: `No Super Admin found with the id: ${req.params.id}` });
  }
});

module.exports = router;
