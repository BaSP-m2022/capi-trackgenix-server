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

// router.put('/edit/:id', (req, res) => {
//   const found = superAdmins.some((superAdmin) => superAdmin.id === parseInt(req.params.id, 10));
//   if (found) {
//     const updateAdm = req.body;
//     superAdmins.forEach((superAdmin) => {
//       if (superAdmin.id === parseInt(req.params.id, 10)) {
//         // eslint-disable-next-line no-param-reassign
//         superAdmin.email = updateAdm.email ? updateAdm.email : superAdmin.email;
//         // eslint-disable-next-line no-param-reassign
//         superAdmin.password = updateAdm.password ? updateAdm.password : superAdmin.password;
//         fs.writeFile('src/data/super-admins.json', JSON.stringify(superAdmins), (err) => {
//           if (err) {
//             res.send(err);
//           } else {
//             res.json({ msg: `Super Admin ${req.params.id} was updated` });
//           }
//         });
//       }
//     });
//   } else {
//     res.status(400).json({ msg: `No Super Admin found with the id: ${req.params.id}` });
//   }
// });

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
};
