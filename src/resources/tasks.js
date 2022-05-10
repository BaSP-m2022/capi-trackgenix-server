const express = require('express');
const tasks = require('../data/tasks.json');

const router = express.Router();

// Gets all tasks
router.get('/getAll', (req, res) => res.json(tasks));

// Gets tasks by Id
router.get('/get/:id', (req, res) => {
  const found = tasks.some((task) => task.id === parseInt(req.params.id, 10));
  if (found) {
    res.json(tasks.filter((task) => task.id === parseInt(req.params.id, 10)));
  } else {
    res.status(400).json({ msg: `No member found with the id of ${req.params.id}` });
  }
});

// Create task
router.post('/postTask', (req, res) => {
  const newTask = {
    taskName: req.body.taskName,
  };
  if (!newTask.taskName) {
    return res.status(400).json({ msg: 'Please include a task' });
  }
  tasks.push(newTask);
  return res.json(tasks);
});

// Edit task
router.put('/get/:id', (req, res) => {
  const found = tasks.some((task) => task.id === parseInt(req.params.id, 10));
  if (found) {
    const updateTask = req.body;
    tasks.forEach((task) => {
      if (task.id === parseInt(req.params.id, 10)) {
        // eslint-disable-next-line no-param-reassign
        task.taskName = updateTask.taskName ? updateTask.taskName : task.taskName;
        res.json({ msg: 'Task updated', task });
      }
    });
  } else {
    res.status(400).json({ msg: `No member found with the id of ${req.params.id}` });
  }
});

// Delete task
router.delete('/get/:id', (req, res) => {
  const found = tasks.some((task) => task.id === parseInt(req.params.id, 10));
  if (found) {
    res.json({
      msg: 'Task deleted',
      tasks: tasks.filter((task) => task.id !== parseInt(req.params.id, 10)),
    });
  } else {
    res.status(400).json({ msg: `No member found with the id of ${req.params.id}` });
  }
});

router.get('/getPriority', (req, res) => {
  const userPriority = req.query.priority;
  const filterPriority = tasks.filter((task) => task.priority === userPriority);
  if (filterPriority.length > 0) {
    res.send(filterPriority);
  } else {
    res.status(400).json({ msg: 'Priority not found' });
  }
});

module.exports = router;
