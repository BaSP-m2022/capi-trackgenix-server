import Joi from 'joi';

const prEmployeeValidation = Joi.object({
  idEmp: Joi.string().required(),
  role: Joi.string().valid('QA', 'Dev', 'TL').required(),
  pm: Joi.bool().required(),
  hours: Joi.number().required(),
  salary: Joi.number().required(),
});
const projectValidation = Joi.object({
  name: Joi.string().min(3).required(),
  type: Joi.string().min(3).required(),
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

export default {
  createProjectValidation,
  putEmployeeValidation,
};
