import express from 'express';
import projectRoutes from './projects';
import tasksRoutes from './tasks';
import timeSheetsRoutes from './timeSheets';
import adminsRoutes from './admins';

const router = express.Router();

router.use('/projects', projectRoutes);
router.use('/tasks', tasksRoutes);
router.use('/time-sheets', timeSheetsRoutes);
router.use('/admins', adminsRoutes);

export default router;
