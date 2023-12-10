"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const user_model_1 = require("./user.model");
// post-a-user
const createUserIntoDb = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.create(user);
    const data = yield user_model_1.User.findOne({ userId: result.userId }).select('-_id -__v -orders');
    return data;
});
// get-all-users"
const getAllUserFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.find({}, { username: 1, fullName: 1, age: 1, email: 1, address: 1, _id: 0 });
    return result;
});
// get-a-user-by-id"
const getSingleUserFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.isUserExists(id);
    if (!user) {
        throw new Error('User not found');
    }
    return user;
});
// put-or-update-a-user"
const updateUserIntoDb = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    const existsUser = yield user_model_1.User.isUserExists(id);
    if (!existsUser) {
        throw new Error('User not found');
    }
    const userData = yield user_model_1.User.updateOne({ userId: id }, user);
    const userInfo = yield user_model_1.User.findOne({ userId: id }, { _id: 0, orders: 0, __v: 0 });
    return { userData, userInfo };
});
// delete-a-user-from-db"
const deleteUserFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existsUser = yield user_model_1.User.isUserExists(id);
    if (!existsUser) {
        throw new Error('User not found');
    }
    const result = yield user_model_1.User.deleteOne({ userId: id });
    return result;
});
// put-add-new-product"
const addNewProductIntoOrder = (id, product) => __awaiter(void 0, void 0, void 0, function* () {
    const existsUser = yield user_model_1.User.isUserExists(id);
    if (!existsUser) {
        throw new Error('User not found');
    }
    const result = yield user_model_1.User.updateOne({ userId: id }, { $addToSet: { orders: product } });
    return result;
});
// get-user-order
const getUserOrdersFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existsUser = yield user_model_1.User.isUserExists(id);
    if (!existsUser) {
        throw new Error('User not found');
    }
    const result = yield user_model_1.User.findOne({ userId: id }, { orders: 1, _id: 0 });
    return result;
});
// Total Price
const getUserOrderTotalAmount = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existsUser = yield user_model_1.User.isUserExists(id);
    if (!existsUser) {
        throw new Error('User not found');
    }
    const result = yield user_model_1.User.aggregate([
        {
            $match: { userId: id },
        },
        {
            $unwind: '$orders',
        },
        {
            $group: {
                _id: null,
                totalPrice: { $sum: '$orders.price' },
            },
        },
        {
            $project: {
                _id: 0,
                totalPrice: 1,
            },
        },
    ]);
    return result;
});
exports.UserServices = {
    createUserIntoDb,
    getAllUserFromDb,
    getSingleUserFromDb,
    updateUserIntoDb,
    deleteUserFromDb,
    addNewProductIntoOrder,
    getUserOrdersFromDb,
    getUserOrderTotalAmount,
};
