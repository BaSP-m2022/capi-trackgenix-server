import Joi from 'joi';

const validateCreate = async (req, res, next) => {
  const adminSchemaJoi = Joi.object({
    firstName: Joi.string().min(3).max(20).required(),
    lastName: Joi.string().min(3).max(20).required(),
    email: Joi.string().email().required(),
    adminStatus: Joi.boolean().required(),
    projects: Joi.array().required(),
  });
  const result = await adminSchemaJoi.validate(req.body);
  if (result.error) {
    return res.status(400).json({
      msg: `There was a validation error: ${result.error.details[0].message}`,
      data: undefined,
      error: true,
    });
  }
  return next();
};

const validateEdit = async (req, res, next) => {
  const adminSchemaJoi = Joi.object({
    firstName: Joi.string().min(3).max(20),
    lastName: Joi.string().min(3).max(20),
    email: Joi.string().email(),
    adminStatus: Joi.boolean(),
    projects: Joi.array(),
  });
  const result = await adminSchemaJoi.validate(req.body);
  if (result.error) {
    return res.status(400).json({
      msg: `There was a validation error: ${result.error.details[0].message}`,
      data: undefined,
      error: true,
    });
  }
  return next();
};

export default {
  validateCreate,
  validateEdit,
};
