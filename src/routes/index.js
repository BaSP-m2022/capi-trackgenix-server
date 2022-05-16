import express from 'express';
import timeSheetsRoutes from './timeSheets';

const router = express.Router();

router.use('/time-sheets', timeSheetsRoutes);

export default router;
