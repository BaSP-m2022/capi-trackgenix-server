const express = require('express');
const fs = require('fs');
// fs es un librería que nos permite interactuar con cualquier archivo del sistema
const employees = require('../data/employees.json');
// Estamos requiriendo este archivo
// y guardando la lista de employees dentro de la constante employees
const router = express.Router();
// const path = require('path'); ?????????????????????

router.get('/', (req, res) => { // FUNCIONA /getAll
  res.json(employees);
});

// OBTENER un Employee
// Por ID (/getById/:id) FUNCIONA
router.get('/:id', (req, res) => {
  const employeeId = parseInt(req.params.id, 10);
  const employeeParsed = employees.find((employee) => employee.id === employeeId);
  if (employeeParsed) {
    res.send(employeeParsed);
  } else {
    res.send('Employee not found');
  }
});

// OBTENER la lista de Employees con la opción de usar filtros
// Por LOCATION (/getByLocation) FUNCIONA
router.get('/', (req, res) => {
  const employeeLocation = req.query.location;
  const filteredEmployees = employees.filter((employee) => employee.location === employeeLocation);
  if (filteredEmployees.length > 0) {
    res.send(filteredEmployees);
  } else {
    res.send(`There are no ${employeeLocation} employees`);
  }
});

// CREAR un Employee (/add) FUNCIONA
router.post('/', (req, res) => {
  const employeeData = req.body;
  employees.push(employeeData);
  if (employeeData.id && employeeData.firstName && employeeData.lastName
    && employeeData.dob && employeeData.email && employeeData.phone && employeeData.address
    && employeeData.location) {
    fs.writeFile('src/data/employees.json', JSON.stringify(employees), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send('Employee added');
      }
    });
  } else {
    // throw new Error('Faltan datos');
    res.send('Faltan datos');
  }
});

// ELIMINAR un Employee
// Por ID (/deleteById/:id) o (/delete/:id) FUNCIONA
router.delete('/:id', (req, res) => {
  const employeeId = req.params.id;
  const filteredEmployees = employees.filter((employee) => employee.id !== employeeId);
  if (employees.length === filteredEmployees.length) {
    res.send('Coud not delete employee because it was not found');
  } else {
    fs.writeFile('src/data/employees.json', JSON.stringify(filteredEmployees), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send('Employee deleted');
      }
    });
  }
});

module.exports = router;
