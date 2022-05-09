const fs = require('fs');
// const req = require('express/lib/request');
const admins = require('../data/admins.json');

// admins.forEach((admin, index) => {
//     console.log(admin.firstName , index);
// })

// get all admins
const getAdminsAll = (req, res) => {
  res.status(200).json({
    data: admins,
  });
};

// get admin by ID
function getAdminById(req, res) {
  const { id } = req.params;
  const admin = admins.find((a) => a.id === parseInt(id, 10));
  if (admin) {
    res.status(200).json(admin);
  } else {
    res.status(404).json({ msg: 'Admin not found' });
  }
}

function createAdmin(req, res) {
//   const {
//     firstName, lastName, id, email, adminStatus, projects,
//   } = req.body;
//   if (firstName && lastName && id && email && adminStatus && projects) {
  const adminNew = {
    firstName: req.body.firstName || '',
    lastName: req.body.lastName || '',
    id: parseInt(req.body.id, 10),
    email: req.body.email || '',
    adminStatus: req.body.adminStatus || '',
    projects: req.body.projects || '',
  };
  admins.push(adminNew);
  fs.writeFile('./src/data/admins.json', JSON.stringify(admins));
  res.status(201).json({ msg: 'Admin created', adminNew });
//   } else {
//     res.status(400).json({ msg: 'Error: Complete all data to create an admin' });
//   }
}

module.exports = {
  getAdminsAll,
  getAdminById,
  createAdmin,
};

// Crear un Admin
// Editar un Admin
// Obtener un Admin
// Eliminar un Admin
// Obtener la lista de Admins con la opción de usar filtros
