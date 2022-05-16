import express from 'express';
import * as controllersSuperAdmin from '../controllers/super-admins';
import * as validationsSuperAdmin from '../validations/super-admins';

const router = express.Router();

router
  .get('/getAll', controllersSuperAdmin.getAllSuperAdmins)
  .get('/getById/:id', controllersSuperAdmin.getuperAdminsById)
  .get('/getByEmail/:email', controllersSuperAdmin.getByHours)
  .post('/add', validationsSuperAdmin.validateSuperAdminCreation, controllersSuperAdmin.createSuperAdmin)
  .put('/edit/:id', validationsSuperAdmin.validateSuperAdminEdition, controllersSuperAdmin.editSuperAdmin)
  .delete('/delete/:id', controllersSuperAdmin.deleteSuperAdmin);

export default router;
