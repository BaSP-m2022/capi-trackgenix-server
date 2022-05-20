import express from 'express';
import adminsController from '../controllers/admins';
import adminsValidations from '../validations/admins';

const router = express.Router();

router
  .get('/', adminsController.getAllAdmins)
  .get('/:id', adminsController.getAdminById)
  .post('/', adminsValidations.validateCreate, adminsController.createAdmin)
  .delete('/:id', adminsController.deleteAdmin)
  .put('/:id', adminsValidations.validateEdit, adminsController.editAdmin);

export default router;
