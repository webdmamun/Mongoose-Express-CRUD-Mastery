import express from 'express';
import { UserController } from './user.controller';
const route = express.Router();

route.post('/', UserController.createUser);
route.get('/', UserController.getAllUser);
route.get('/:userId', UserController.getSingleUser);
route.put('/:userId', UserController.updateUser);
route.delete('/:userId', UserController.deleteUser);

export const userRoute = route;
