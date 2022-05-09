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
      res.json({ msg: 'Project Deleted' });
    });
  } else {
    res.status(400).json({ msg: `No project with the id of ${req.params.id}` });
  }
});

router.get('/getAll', (req, res) => {
  res.json(projects);
});

module.exports = router;
