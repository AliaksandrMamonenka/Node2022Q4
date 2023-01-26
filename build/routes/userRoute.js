import { Router } from 'express';
import UserController from '../controllers/userController.js';
const userRouter = Router();
userRouter.get('/api/users', UserController.getAllUsers);
userRouter.get('/api/users/:id', UserController.getUser);
userRouter.post('/api/users', UserController.createUser);
userRouter.put('/api/users', UserController.updateUser);
userRouter.delete('/api/users/:id', UserController.deleteUser);
userRouter.post('/api/users/assign-to-group', UserController.assignToGroup);
export default userRouter;
//# sourceMappingURL=userRoute.js.map