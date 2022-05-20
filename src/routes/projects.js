import express from 'express';
import projectsController from '../controllers/projects';
import validations from '../validations/Projects';

const router = express.Router();

router
  .post('/', validations.createProjectValidation, projectsController.createProject)
  .post('/addEmployee/:id', validations.putEmployeeValidation, projectsController.addEmployee)
  .delete('/:id', projectsController.deleteProject)
  .get('/', projectsController.getAllProjects)
  .get('/:id', projectsController.getProjectById)
  .put('/:id', validations.putProjectValidation, projectsController.updateProject);

export default router;
