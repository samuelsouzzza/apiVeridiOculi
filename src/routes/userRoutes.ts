import { Router } from 'express';
import {
  authUser,
  createUser,
  getAllUsers,
} from '../controllers/userController';

const userRouter = Router();

userRouter.post('/users', createUser);
userRouter.get('/users', getAllUsers);
userRouter.post('/auth', authUser);

export default userRouter;
