import express from 'express';
import employeeControllers from '../controllers/employees';
import employeeValidations from '../validations/employees';

const router = express.Router();

router
// GET → /employees → Devuelve la lista completa de employees, considerando filtros
  .get('/', employeeControllers.getAllEmployees)

// GET → /employees/:id → Devuelve un employee en particular
  .get('/:id', employeeControllers.getEmployeeById)

// PUT → /employees/:id → Actualiza un employee
  .put('/:id', employeeValidations.editEmployeeValidation, employeeControllers.editEmployee)

// POST → /employees → Crea un nuevo employee
  .post('/', employeeValidations.createValidation, employeeControllers.createEmployee)

// DELETE → /employees/:id → Elimina un employee
  .delete('/:id', employeeControllers.deleteEmployee);
export default router;
