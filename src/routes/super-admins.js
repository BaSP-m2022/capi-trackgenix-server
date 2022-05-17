import express from 'express';
import * as controllersSuperAdmin from '../controllers/super-admins';
import * as validationsSuperAdmin from '../validations/super-admins';

const router = express.Router();

router
  .post('/add', validationsSuperAdmin.superAdminCreationValidation, controllersSuperAdmin.addSuperAdmin)
  .put('/edit/:id', validationsSuperAdmin.superAdminEditionValidation, controllersSuperAdmin.editSuperAdmin)
  .delete('/delete/:id', controllersSuperAdmin.deleteSuperAdmin);

export default router;
