import express from 'express';
import projectRoutes from './projects';
import tasksRoutes from './tasks';

const router = express.Router();

router.use('/projects', projectRoutes);
router.use('/tasks', tasksRoutes);

export default router;
