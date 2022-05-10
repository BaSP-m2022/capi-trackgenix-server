const fs = require('file-system');
// const fs = require('fs');
// const req = require('express/lib/request');
const admins = require('../data/admins.json');

// get all admins
const getAdminsAll = (req, res) => {
  res.status(200).json({
    data: admins,
  });
};

// get admin by ID
function getAdminById(req, res) {
  const { id } = req.params;
  const admin = admins.find((adminFound) => adminFound.id === parseInt(id, 10));
  if (admin) {
    res.status(200).json(admin);
  } else {
    res.status(404).json(`Admin id:${id} not found`);
  }
}

// create admin
function createAdmin(req, res) {
  const {
    firstName, lastName, id, email, adminStatus, projects,
  } = req.body;
  if (firstName && lastName && id && email && adminStatus && projects) {
    const adminNew = {
      firstName: req.body.firstName || '',
      lastName: req.body.lastName || '',
      id: parseInt(req.body.id, 10),
      email: req.body.email || '',
      adminStatus: true || '',
      projects: req.body.projects || '',
    };
    admins.push(adminNew);
    fs.writeFile('./src/data/admins.json', JSON.stringify(admins));
    res.status(201).json({ msg: 'Admin created', adminNew });
  } else {
    res.status(400).json({ msg: 'Error: Complete all data to create an admin and status must be true' });
  }
}

// edit admin
function editAdmin(req, res) {
  const { id } = req.params;
  const admin = admins.find((adminFound) => adminFound.id === parseInt(id, 10));
  if (admin) {
    const updAdmin = req.body;
    admins.forEach((adminFound) => {
      if (adminFound.id === parseInt(id, 10)) {
        const adminUpdated = {};
        adminUpdated.firstName = updAdmin.firstName ? updAdmin.firstName : adminFound.firstName;
        adminUpdated.lastName = updAdmin.lastName ? updAdmin.lastName : adminFound.lastName;
        adminUpdated.id = updAdmin.id ? updAdmin.id : adminFound.id;
        adminUpdated.email = updAdmin.email ? updAdmin.email : adminFound.email;
        adminUpdated.adminStatus = updAdmin.adminStatus
          ? updAdmin.adminStatus : adminFound.adminStatus;
        adminUpdated.projects = updAdmin.projects ? updAdmin.projects : adminFound.projects;
        admins.push(adminUpdated);
        fs.writeFile('./src/data/admins.json', JSON.stringify(admins));
        res.status(201).json({ msg: 'Admin updated', adminUpdated });
      }
    });
  } else {
    res.status(404).json(`Admin id:${id} not found`);
  }
}

// delete admin
function deleteAdmin(req, res) {
  const adminId = req.params.id;
  const filteredAdmins = admins.filter((admin) => admin.id !== parseInt(adminId, 10));
  if (admins.length === filteredAdmins.length) {
    res.status(404).json(`Admin id:${adminId} not found`);
  } else {
    fs.writeFile('./src/data/admins.json', JSON.stringify(filteredAdmins), (error) => {
      if (error) {
        res.send(error);
      } else {
        res.json(`Admin id: ${adminId} deleted`);
      }
    });
  }
}

// filter admin

module.exports = {
  getAdminsAll,
  getAdminById,
  createAdmin,
  editAdmin,
  deleteAdmin,
};

// Crear un Admin
// Editar un Admin
// Obtener un Admin
// Eliminar un Admin
// Obtener la lista de Admins con la opción de usar filtros
