const fs = require('file-system');
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
    res.status(200).json({ data: admin });
  } else {
    res.status(404).json(`Admin id:${id} not found`);
  }
}

// filter admin by first name
const getAdminByFirstName = (req, res) => {
  const { firstName } = req.params;
  const adminName = firstName.substring(0, 1).toUpperCase() + firstName.substring(1).toLowerCase();
  const adminFound = admins.filter((filt) => filt.firstName === adminName);
  if (adminFound.length) {
    res.json({ data: adminFound });
  } else {
    res.status(404).json(`Admin name: ${adminName} not found`);
  }
};

// filter admin by last name
const getAdminByLastName = (req, res) => {
  const { lastName } = req.params;
  const adminLName = lastName.substring(0, 1).toUpperCase() + lastName.substring(1).toLowerCase();
  const adminFound = admins.filter((filt) => filt.lastName === adminLName);
  if (adminFound.length) {
    res.json({ data: adminFound });
  } else {
    res.status(404).json(`Admin name: ${adminLName} not found`);
  }
};

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
  const {
    firstName, lastName, id, email, adminStatus, projects,
  } = req.body;
  const admin = admins.find((adminFound) => adminFound.id === parseInt(req.params.id, 10));
  if (!firstName
    || !lastName
    || !id
    || !email
    || !adminStatus
    || !projects) {
    res.status(404).send('The data is not correct');
  } else if (!admin) {
    res.status(404).json('Admin not found');
  }
  const index = admins.indexOf(admin);
  admins[index].firstName = firstName;
  admins[index].lastName = lastName;
  admins[index].id = id;
  admins[index].email = email;
  admins[index].adminStatus = adminStatus;
  admins[index].projects = projects;
  fs.writeFile('./src/data/admins.json', JSON.stringify(admins), (err) => {
    if (err) {
      res.send(err);
    } else {
      res.status(201).json({ msg: 'Admin updated' });
    }
  });
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
        res.status(200).json(`Admin id: ${adminId} deleted`);
      }
    });
  }
}

module.exports = {
  getAdminsAll,
  getAdminById,
  getAdminByFirstName,
  getAdminByLastName,
  createAdmin,
  editAdmin,
  deleteAdmin,
};
