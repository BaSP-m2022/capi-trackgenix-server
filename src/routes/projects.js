import express from 'express';
import { deleteProject, addEmployee } from '../controllers/projects';
import projectValidation from '../validations/projects';

const router = express.Router();

router
//   .get('/', projectsController.getAllProjects)
//   .post('/', projectValidation.prValidation, projectsController.createProject)
  .post('/addEmployee', projectValidation.prEmployeeValidation, addEmployee)
//   .get('/:id', projectsController.getProjectById)
//   .get('/projectByType', projectsController.getProjectByType)
//   .put('/:id', projectsController.updateProject)
  .delete('/:id', deleteProject);

export default router;
