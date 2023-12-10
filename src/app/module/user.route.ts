import express from 'express';
import { UserControllers } from './user.controllers';

const router = express.Router();

router.post('/users', UserControllers.createUser);

export const UserRoutes = router;
