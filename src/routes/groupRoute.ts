import { Router } from 'express';
import GroupController from '../controllers/groupController.js';

const groupRouter = Router();

groupRouter.get('/api/group', GroupController.getAllGroups);
groupRouter.get('/api/group/:id', GroupController.getGroup);
groupRouter.post('/api/group', GroupController.createGroup);
groupRouter.put('/api/group', GroupController.updateGroup);
groupRouter.delete('/api/group/:id', GroupController.deleteGroup);

export default groupRouter;
