import express from 'express';
import * as timeSheetController from '../controllers/time-sheets';
import * as timeSheetValidation from '../validations/timeSheets';

const router = express.Router();

router
  .get('/', timeSheetController.getAllSheets)
  .get('/getByHours/', timeSheetController.getByHours)
  .get('/:id', timeSheetController.getSheetById)
  .post('/', timeSheetValidation.validateSheetCreation, timeSheetController.createSheet)
  .put('/:id', timeSheetValidation.validateSheetEdition, timeSheetController.editSheet)
  .delete('/:id', timeSheetController.deleteSheet);

export default router;
