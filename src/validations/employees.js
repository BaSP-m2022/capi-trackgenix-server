import joi from 'joi';

const createValidation = (req, res, next) => {
  const Schema = joi.object({
    firstName: joi.string().min(2).required(),
    lastName: joi.string().min(2).required(),
    dateOfBirth: joi.date().required(),
    email: joi.string().min(8).required(),
    phone: joi.string().min(12).max(12).required(),
    address: joi.string().min(4).required(),
    location: joi.string().min(2).required(),
  });

  const validation = Schema.validate(req.body);

  if (validation.error) {
    return res.status(400).json({
      msg: 'There has been an error when validating the request',
      error: validation.error.details[0].message,
    });
  }
  return next();
};

const editEmployeeValidation = (req, res, next) => {
  const Schema = joi.object({
    firstName: joi.string().min(2),
    lastName: joi.string().min(2),
    dateOfBirth: joi.date(),
    email: joi.string().min(8),
    phone: joi.string().min(12).max(12),
    address: joi.string().min(4),
    location: joi.string().min(2),
  });

  const validation = Schema.validate(req.body);

  if (validation.error) {
    return res.status(400).json({
      msg: 'There has been an error when validating the request',
      error: validation.error.details[0].message,
    });
  }
  return next();
};

export default { joi, createValidation, editEmployeeValidation };
