import Joi from 'joi';

const validationObj = {
  login: Joi.string().required(),
  password: Joi.string().alphanum().required(),
  age: Joi.number().min(4).max(130).required(),
};

const updateValidationObj = {
  id: Joi.number().required(),
};

const userValidation = (data: any) => {
  const schema = Joi.object(validationObj);

  return schema.validate(data, { abortEarly: false });
};

const userUpdateValidation = (data: any) => {
  const schema = Joi.object({
    ...validationObj,
    ...updateValidationObj,
  });

  return schema.validate(data, { abortEarly: false });
};

export { userValidation, userUpdateValidation };
