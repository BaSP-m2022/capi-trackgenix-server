import express from 'express';
import projectRoutes from './projects';
import tasksRoutes from './tasks';
import adminsRoutes from './admins';

const router = express.Router();

router.use('/projects', projectRoutes);
router.use('/tasks', tasksRoutes);
router.use('/admins', adminsRoutes);

export default router;
