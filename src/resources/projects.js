const express = require('express');
const fs = require('fs');
const path = require('path');
const projects = require('../data/projects.json');

const router = express.Router();

// Delete project by Id

router.delete('/delete/:id', (req, res) => {
  const found = projects.some((project) => project.id === parseInt(req.params.id, 10));
  if (found) {
    const result = projects.filter((project) => project.id !== parseInt(req.params.id, 10));
    fs.writeFile(path.join(__dirname, '../data/projects.json'), JSON.stringify(result), (err) => {
      if (err) throw err;
    });
    res.json({ msg: 'Project Deleted' });
  } else {
    res.status(400).json({ msg: `No project with the id of ${req.params.id}` });
  }
});

// Add employee and role to project by project id
router.post('/addEmployee/:id', (req, res) => {
  const found = projects.some((project) => project.id === parseInt(req.params.id, 10));
  if (found) {
    const updEmployee = req.body;
    if (!updEmployee.id || !updEmployee.role) {
      res.status(400).json({
        msg: 'Please add an employee id, and the role of employee.',
      });
    }
    projects.forEach((project) => {
      if (project.id === parseInt(req.params.id, 10)) {
        const employee = project.employeesAndRoles;
        employee.push(updEmployee);
      }
    });
    fs.writeFile(path.join(__dirname, '../data/projects.json'), JSON.stringify(projects), (err) => {
      if (err) throw err;
    });
    res.json('Employee added');
  } else {
    res.status(400).json({ msg: `No project with the id of ${req.params.id}` });
  }
});

// Get projects by type with a query param
router.get('/getbyType', (req, res) => {
  const projectType = req.query.role;
  const filteredProjects = projects.filter((project) => project.type === projectType);
  if (filteredProjects.length > 0) res.json(filteredProjects);
  else res.status(400).json({ msg: `There are no ${projectType} projects` });
});

module.exports = router;
