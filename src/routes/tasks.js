import express from 'express';
import tasksController from '../controllers/tasks';
import validations from '../validations/tasks';

const router = express.Router();

router
  .post('/', validations.createTaskValidation, tasksController.createTask)
  .delete('/:id', tasksController.deleteTask)
  .get('/', tasksController.getAllTask)
  .get('/filter/', tasksController.filterByPriority)
  .get('/:id', tasksController.getTaskById)
  .put('/:id', validations.updateTaskValidation, tasksController.editTask);

export default router;
