import express from 'express';
import { UserController } from './user.controller';
const route = express.Router();

route.post('/', UserController.createUser);
route.get('/', UserController.getAllUser);
route.get('/:userId', UserController.getSingleUser);
route.put('/:userId', UserController.updateUser);
route.delete('/:userId', UserController.deleteUser);
route.put('/:userId/orders', UserController.addNewProduct);
route.get('/:userId/orders', UserController.getUserOrders);
route.get('/:userId/orders/total-price', UserController.getUserOrdersTotal);

export const userRoute = route;
