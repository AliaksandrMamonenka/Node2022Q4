import Joi from 'joi';
const validationObj = {
    login: Joi.string().required(),
    password: Joi.string().alphanum().required(),
    age: Joi.number().min(4).max(130).required(),
};
const updateValidationObj = {
    id: Joi.string().required(),
    isDeleted: Joi.boolean().required(),
};
const userValidation = (data) => {
    const schema = Joi.object(validationObj);
    return schema.validate(data, { abortEarly: false });
};
const userUpdateValidation = (data) => {
    const schema = Joi.object({
        ...validationObj,
        ...updateValidationObj,
    });
    return schema.validate(data, { abortEarly: false });
};
export { userValidation, userUpdateValidation };
//# sourceMappingURL=userValidation.js.map