import Joi from 'joi';

const taskValidateUpdate = Joi.object({
  idEmp: Joi.string(),
  name: Joi.string().min(3),
  description: Joi.string().min(6),
  status: Joi.string().min(2).valid(
    'To do',
    'In progress',
    'Review',
    'Blocked',
    'Done',
    'Cancelled',
  ),
  priority: Joi.string().min(3).valid('Low', 'Medium', 'High', 'Maximun'),
});

const taskValidationCreate = Joi.object({
  idEmp: Joi.string().required(),
  name: Joi.string().min(3).required(),
  description: Joi.string().min(6).required(),
  status: Joi.string().min(2).valid(
    'To do',
    'In progress',
    'Review',
    'Blocked',
    'Done',
    'Cancelled',
  ).required(),
  priority: Joi.string().min(3).valid('Low', 'Medium', 'High', 'Maximun').required(),
});

const createTaskValidation = (req, res, next) => {
  const validation = taskValidationCreate.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      msg: `There was a validation error:
      ${validation.error.details.map((x) => x.message).join(', ')}`,
      data: null,
      err: true,
    });
  } return next();
};

const updateTaskValidation = (req, res, next) => {
  const validation = taskValidateUpdate.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      msg: `There was a validation error:
        ${validation.error.details.map((x) => x.message).join(', ')}`,
      data: null,
      err: true,
    });
  } return next();
};

export default { createTaskValidation, updateTaskValidation };
