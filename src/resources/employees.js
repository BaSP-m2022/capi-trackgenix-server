const express = require('express');
// const fs = require('fs');
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

module.exports = router;
