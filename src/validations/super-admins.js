import Joi from 'joi';

const superAdminObject = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});
const superAdminCreationValidation = (req, res, next) => {
  const validate = superAdminObject.validate(req.body);
  if (validate.error) {
    return res.status(400).json({
      msg: 'Super Admin add validation error',
    });
  }
  return next();
};
const superAdminEditionValidation = (req, res, next) => {
  const validate = superAdminObject.validate(req.body);
  if (validate.error) {
    return res.status(400).json({
      msg: 'Super Admin edit validation error',
    });
  }
  return next();
};
export {
  superAdminCreationValidation,
  superAdminEditionValidation,
};
