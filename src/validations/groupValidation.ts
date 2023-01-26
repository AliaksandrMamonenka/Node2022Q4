import Joi from 'joi';

const validationObj = {
  name: Joi.string().required(),
  permissions: Joi.array().items(Joi.string()),
};

const updateValidationObj = {
  id: Joi.string().required(),
};

const groupValidation = (data: any) => {
  const schema = Joi.object(validationObj);

  return schema.validate(data, { abortEarly: false });
};

const groupUpdateValidation = (data: any) => {
  const schema = Joi.object({
    ...validationObj,
    ...updateValidationObj,
  });

  return schema.validate(data, { abortEarly: false });
};

export { groupValidation, groupUpdateValidation };
