import { Router } from 'express';
import {
  authUser,
  createUser,
  getAllUsers,
} from '../controllers/userController';

const router = Router();

router.post('/users', createUser);
router.get('/users', getAllUsers);
router.post('/auth', authUser);

export default router;
