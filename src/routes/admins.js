import express from 'express';
import adminsController from '../controllers/admins';
// import adminsValidations from '../validations/admins';

const router = express.Router();

router
  .get('/', adminsController.getAllAdmins)
  .get('/:id', adminsController.getAdminById)
  .post('/', adminsController.createAdmin)
  .delete('/:id', adminsController.deleteAdmin);

export default router;
