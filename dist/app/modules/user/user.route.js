"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const route = express_1.default.Router();
route.post('/', user_controller_1.UserController.createUser);
route.get('/', user_controller_1.UserController.getAllUser);
route.get('/:userId', user_controller_1.UserController.getSingleUser);
route.put('/:userId', user_controller_1.UserController.updateUser);
route.delete('/:userId', user_controller_1.UserController.deleteUser);
route.put('/:userId/orders', user_controller_1.UserController.addNewProduct);
route.get('/:userId/orders', user_controller_1.UserController.getUserOrders);
route.get('/:userId/orders/total-price', user_controller_1.UserController.getUserOrdersTotal);
exports.userRoute = route;
