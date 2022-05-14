import Joi from 'joi';

const prValidation = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().min(3).required(),
  type: Joi.string().min(3).required(),
  employees: Joi.array().items(Joi.object({
    id: Joi.number().required(),
    role: Joi.string().required(),
    pm: Joi.boolean().required(),
    hours: Joi.number().required(),
  })),
});

const prEmployeeValidation = Joi.object({
  id: Joi.string().required,
  name: Joi.string().min(3).required(),
  role: Joi.string().min(3).required(),
  pm: Joi.bool().required(),
  hours: Joi.number().required(),
});

const projectValidation = {
  prValidation,
  prEmployeeValidation,
};

export default projectValidation;
