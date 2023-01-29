import Joi from 'joi';
const validationObj = {
    name: Joi.string().required(),
    permissions: Joi.array().items(Joi.string()),
};
const updateValidationObj = {
    id: Joi.number().required(),
};
const groupValidation = (data) => {
    const schema = Joi.object(validationObj);
    return schema.validate(data, { abortEarly: false });
};
const groupUpdateValidation = (data) => {
    const schema = Joi.object({
        ...validationObj,
        ...updateValidationObj,
    });
    return schema.validate(data, { abortEarly: false });
};
export { groupValidation, groupUpdateValidation };
//# sourceMappingURL=groupValidation.js.map