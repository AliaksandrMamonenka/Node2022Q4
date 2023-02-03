import { Router } from 'express';
import GroupController from '../controllers/groupController.js';

const userRouter = Router();

userRouter.get('/api/group', GroupController.getAllGroups);
userRouter.get('/api/group/:id', GroupController.getGroup);
userRouter.post('/api/group', GroupController.createGroup);
userRouter.put('/api/group', GroupController.updateGroup);
userRouter.delete('/api/group/:id', GroupController.deleteGroup);

export default userRouter;
