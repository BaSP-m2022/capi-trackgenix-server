/* eslint-disable import/prefer-default-export */
import SuperAdmin from '../models/super-admins';

// const express = require('express');
// const fs = require('fs');

// const router = express.Router();

// Add Super Admin

async function addSuperAdmin(req, res) {
  try {
    const superData = req.body;
    const superAdmin = new SuperAdmin({
      email: superData.email,
      password: superData.password,
    });
    const added = await superAdmin.save();
    return res.status(201).json({
      msg: `Super Admin succesfully added. \nSuper Admin: ${added}`,
    });
  } catch (error) {
    return res.json({
      msg: 'An error has occurred',
      error: error.details[0].message,
    });
  }
}

// Edit Super Admin

async function editSuperAdmin(req, res) {
  try {
    if (!req.params) {
      return res.status(400).json({
        msg: 'Missing id parameter',
      });
    }
    const edit = await SuperAdmin.findByIdAndUpdate(
      req.params.email,
      req.params.password,
      { new: true },
    );
    if (!edit) {
      return res.status(404).json({
        msg: 'Super Admin not found',
      });
    }
    return res.status(201).json({
      msg: `Super Admin updated. \nSuper Admin: ${edit}`,
    });
  } catch (error) {
    return res.json({
      msg: 'And error has ocurred',
      error: error.details[0].message,
    });
  }
}

// // Delete Super Admin

// router.delete('/delete/:id', (req, res) => {
//   const found = superAdmins.some((superAdmin) => superAdmin.id === parseInt(req.params.id, 10));
//   if (found) {
//     const result = superAdmins.filter((superAdm) => superAdm.id !== parseInt(req.params.id, 10));
//     fs.writeFile('src/data/super-admins.json', JSON.stringify(result), (err) => {
//       if (err) throw err;
//     });
//     res.json({ msg: `SuperAdmin ${req.params.id} deleted` });
//   } else {
//     res.status(400).json({ msg: `No Super Admin found with the id: ${req.params.id}` });
//   }
// });

export {
  addSuperAdmin,
  editSuperAdmin,
};
