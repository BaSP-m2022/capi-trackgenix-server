import Joi from 'joi';

const createSheet = Joi.object({
  employee: Joi.string().required(),
  hoursWorked: Joi.number().required(),
  dailyHS: Joi.number().required(),
});

const editSheet = Joi.object({
  hoursWorked: Joi.number().required(),
  dailyHS: Joi.number().required(),
});

const validateSheetCreation = (req, res, next) => {
  const validate = createSheet.validate(req.body);
  if (validate.error) {
    return res.status(400).json({
      msg: 'Validation error, wrongly entered data',
    });
  }
  return next();
};

const validateSheetEdition = (req, res, next) => {
  const validate = editSheet.validate(req.body);

  if (validate.error) {
    return res.status(400).json({
      msg: 'Validation error, wrongly entered data',
    });
  }
  return next();
};

export {
  validateSheetCreation,
  validateSheetEdition,
};
