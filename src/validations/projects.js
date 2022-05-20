import Joi from 'joi';

const prEmployeeValidation = Joi.object({
  idEmployee: Joi.string().required(),
  employeeRole: Joi.string().valid('QA', 'Dev', 'TL').required(),
  isProjectManager: Joi.bool().required(),
  hours: Joi.number().required(),
  salary: Joi.number().required(),
});
const projectValidation = Joi.object({
  projectName: Joi.string().min(3).required(),
  projectType: Joi.string().min(3).required(),
  employees: Joi.array().items(prEmployeeValidation),
});

const createProjectValidation = (req, res, next) => {
  const validation = projectValidation.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      msg: `There was a validation error:
      ${validation.error.details.map((x) => x.message).join(', ')}`,
    });
  } return next();
};
const putEmployeeValidation = (req, res, next) => {
  const eValidation = prEmployeeValidation.validate(req.body);
  if (eValidation.error) {
    return res.status(400).json({
      msg: `There was a validation error:
            ${eValidation.error.details.map((x) => x.message).join(', ')}`,
    });
  } return next();
};
const putProjectValidation = (req, res, next) => {
  const projValidation = projectValidation.validate(req.body);
  if (projValidation.error) {
    return res.status(400).json({
      msg: `There was a validation error:
              ${projValidation.error.details.map((x) => x.message).join(', ')}`,
    });
  } return next();
};
export default {
  createProjectValidation,
  putEmployeeValidation,
  putProjectValidation,
};
