import express from 'express';
import projectsController from '../controllers/projects';
import validations from '../validations/projects';

const router = express.Router();

router
  .post('/', validations.createProjectValidation, projectsController.createProject)
  .post('/addEmployee/:id', validations.putEmployeeValidation, projectsController.addEmployee)
  .delete('/:id', projectsController.deleteProject);

export default router;
