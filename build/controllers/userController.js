import UserService from '../services/userService.js';
import { userUpdateValidation, userValidation } from '../validations/userValidation.js';
export const getAllUsers = (req, res) => {
    res.status(200).json(UserService.getAllUsers(req.query));
};
export const getUser = (req, res) => {
    res.status(200).json(UserService.getUser(req.params.id));
};
export const createUser = (req, res) => {
    const { error } = userValidation(req.body);
    if (error) {
        return res.status(400).json(error.details);
    }
    res.status(200).json(UserService.createUser(req.body));
};
export const updateUser = (req, res) => {
    const { error } = userUpdateValidation(req.body);
    if (error) {
        return res.status(400).json(error.details);
    }
};
export const deleteUser = (req, res) => {
};
//# sourceMappingURL=userController.js.map