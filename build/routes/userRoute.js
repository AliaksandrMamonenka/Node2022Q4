import { Router } from 'express';
import { getUser, createUser, updateUser, deleteUser, getAllUsers } from '../controllers/userController.js';
const userRouter = Router();
userRouter.get('/api/users', getAllUsers);
userRouter.get('/api/users/:id', getUser);
userRouter.post('/api/users', createUser);
userRouter.put('/api/users', updateUser);
userRouter.delete('/api/users/:id', deleteUser);
export default userRouter;
//# sourceMappingURL=userRoute.js.map