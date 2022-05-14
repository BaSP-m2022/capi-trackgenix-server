import express from 'express';
import models from '../models/projects';

const fs = require('fs');
const path = require('path');
const projects = require('../data/projects.json');

const router = express.Router();

// Delete project by Id
const deleteProject = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        msg: 'missing id parameter',
      });
    }
    const result = await models.Project.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({
        msg: 'The project has not been found',
      });
    }
    return res.status(200).json({
      msg: 'The project has been deleted',
    });
  } catch (error) {
    return res.status(500).json({
      msg: `'There has been an error: ${error.msg}`,
    });
  }
};

const addEmployee = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        msg: 'missing id parameter',
      });
    }
    return res.status(201);
  } catch (error) {
    return res.status(500);
  }
};
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

router.get('/', (req, res) => {
  res.send(projects);
});

router.get('/:id', (req, res) => {
  const projectId = req.params.id;
  const projectFind = projects.find((project) => project.id === parseInt(projectId, 10));
  if (projectFind) {
    res.send(projectFind);
  } else {
    res.send('Project not found');
  }
});

router.post('/', (req, res) => {
  const projectData = req.body;
  if (req.body.id && req.body.name && req.body.type && req.body.employeesAndRoles) {
    projects.push(projectData);
    fs.writeFile('src/data/projects.json', JSON.stringify(projects), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send('Project created');
      }
    });
  } else {
    res.send('Data missing');
  }
});

// eslint-disable-next-line consistent-return
router.put('/edit/:id', (req, res) => {
  const { name, type } = req.body;
  const sheet = projects.find((project) => project.id === parseInt(req.params.id, 10));
  if (!name || !type || !sheet) {
    return res.status(404).send('The data is not correct');
  }
  const index = projects.indexOf(sheet);
  projects[index].name = name;
  projects[index].type = type;
  fs.writeFile('src/data/projects.json', JSON.stringify(projects), (err) => {
    if (err) {
      res.send(err);
    } else {
      res.send('Project edited correctly');
    }
  });
});

export {
  // eslint-disable-next-line import/prefer-default-export
  deleteProject,
  addEmployee,

};
