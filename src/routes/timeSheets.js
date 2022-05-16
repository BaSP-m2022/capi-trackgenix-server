import express from 'express';
import * as timeSheetController from '../controllers/time-sheets';
import * as timeSheetValidation from '../validations/timeSheets';

const router = express.Router();

router
  .get('/', timeSheetController.getAllSheets)
  .get('/:id', timeSheetController.getSheetById)
  .post('/', timeSheetValidation.validateSheetCreation, timeSheetController.createSheet)
  .put('/edit/:id', timeSheetValidation.validateSheetEdition, timeSheetController.editSheet)
  .delete('/del/:id', timeSheetController.deleteSheet)
  .get('/getByHours/:id', timeSheetController.getByHours);

export default router;
