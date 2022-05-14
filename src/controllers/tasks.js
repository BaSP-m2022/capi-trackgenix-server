import express from 'express';

const fs = require('fs');
const tasks = require('../data/tasks.json');

const router = express.Router();

// Gets all tasks
router.get('/', (req, res) => res.status(200).send(tasks));

// Return the task with the given ID
router.get('/:id', (req, res) => {
  const task = tasks.find((findTask) => findTask.id === parseInt(req.params.id, 10));

  if (!task) {
    return res.status(404).send('The task with the given ID was not found');
  }
  return res.send(task);
});

// Create task
router.post('/', (req, res) => {
  const { body } = req;
  const find = tasks.find((findTask) => findTask.id === parseInt(body.id, 10));
  const index = tasks.indexOf(find);

  if (!body.id || !body.employeeId || !body.taskName || !body.description || !body.status
    || !body.priority || !body.employeeName) {
    return res.status(404).send('The data is not correct');
  }
  if (index !== -1) {
    return res.status(404).send('The time sheets already exist');
  }

  const task = {
    id: body.id,
    employeeId: body.employeeId,
    taskName: body.taskName,
    description: body.description,
    status: body.status,
    priority: body.priority,
    employeeName: body.employeeName,
  };

  tasks.push(task);
  fs.writeFile('src/data/tasks.json', JSON.stringify(tasks), (err) => {
    if (err) {
      return res.send(err);
    }
    return res.send('Task created');
  });
  return res.send(`${task}`);
});

// Edit task
router.put('/:id', (req, res) => {
  const { body } = req;
  const task = tasks.find((findTask) => findTask.id === parseInt(req.params.id, 10));

  if (!body.taskName || !body.description || !body.status || !body.priority
    || !body.employeeName) {
    return res.status(404).send('The data is not correct');
  }
  if (!task) { return res.status(404).send('The given id not exist'); }

  const index = tasks.indexOf(task);
  tasks[index].taskName = body.taskName;
  tasks[index].description = body.description;
  tasks[index].status = body.status;
  tasks[index].priority = body.priority;
  tasks[index].employeeName = body.employeeName;

  fs.writeFile('src/data/tasks.json', JSON.stringify(tasks), (err) => {
    if (err) {
      res.send(err);
    } else {
      res.send('Tasks created');
    }
  });
  return res.send(`${task}`);
});

// Delete task
router.delete('/:id', (req, res) => {
  const task = tasks.find((findTask) => findTask.id === parseInt(req.params.id, 10));

  if (!task) {
    return res.status(404).send('The task with the given ID was not found');
  }
  const index = tasks.indexOf(task);
  tasks.splice(index, 1);

  fs.writeFile('src/data/tasks.json', JSON.stringify(tasks), (err) => {
    if (err) {
      res.send(err);
    } else {
      res.send('Tasks edited');
    }
  });
  return res.send(`${task}`);
});

// Filter by priority
router.get('/getByPiority/:id', (req, res) => {
  let priority = '';
  if (req.params.id === '1') {
    priority = 'Low';
  }
  if (req.params.id === '2') {
    priority = 'Medium';
  }
  if (req.params.id === '3') {
    priority = 'High';
  }
  const taskByPriority = tasks.filter((findTaks) => findTaks.priority === priority);
  if (taskByPriority.length === 0) {
    return res.status(404).send(`Incorrect Priority. Low = 1, Medium = 2, High = 3 ${priority}`);
  }
  return res.status(200).send(taskByPriority);
});

export default router;
