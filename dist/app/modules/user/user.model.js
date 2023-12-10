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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
const nameSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        trim: true,
        required: [true, 'First name is required'],
    },
    lastName: {
        type: String,
        trim: true,
        required: [true, 'Last name is required'],
    },
});
const addressSchema = new mongoose_1.Schema({
    street: {
        type: String,
        trim: true,
        required: [true, 'Street name is required'],
    },
    city: {
        type: String,
        trim: true,
        required: [true, 'City name is required'],
    },
    country: {
        type: String,
        trim: true,
        required: [true, 'Country name is required'],
    },
});
const orderSchema = new mongoose_1.Schema({
    productName: {
        type: String,
        trim: true,
        required: [true, 'Product name is required'],
    },
    price: {
        type: Number,
        trim: true,
        required: [true, 'Product price is required'],
    },
    quantity: {
        type: Number,
        trim: true,
        required: [true, 'Product quantity is required'],
    },
});
const UserSchema = new mongoose_1.Schema({
    userId: {
        type: Number,
        unique: true,
        required: true,
    },
    username: {
        type: String,
        unique: true,
        trim: true,
        required: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    fullName: {
        type: nameSchema,
        required: [true, 'Name name is required'],
    },
    age: {
        type: Number,
        trim: true,
        required: [true, 'Age is required'],
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'Email is required'],
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    hobbies: {
        type: [String],
        default: [],
    },
    address: {
        type: addressSchema,
        required: [true, 'Address is required'],
    },
    orders: {
        type: [orderSchema],
    },
});
// Password Bcrypt Here
UserSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this; // eslint-disable-line
        user.password = yield bcrypt_1.default.hash(user.password, Number(config_1.default.bcryptSaltRounds));
        next();
    });
});
// Protect Password from showing
UserSchema.methods.toJSON = function () {
    const user = this; // eslint-disable-line
    const userObject = user.toObject();
    delete userObject.password;
    return userObject;
};
// Check User Exists or not with Static
UserSchema.statics.isUserExists = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield exports.User.findOne({ userId: id }, { password: 0, _id: 0, orders: 0, __v: 0 });
        return user;
    });
};
exports.User = (0, mongoose_1.model)('User', UserSchema);
