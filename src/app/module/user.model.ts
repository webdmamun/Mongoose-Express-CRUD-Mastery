/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import { Address, Orders, User, UserModels, UserName } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../config';

const userNameSchema = new Schema<UserName>({
  firstName: { type: String, required: [true, 'FirstName is required'] },
  lastName: { type: String, required: [true, 'lastName is required'] },
});

const addressSchema = new Schema<Address>({
  street: { type: String, required: [true, 'street is required'] },
  city: { type: String, required: [true, 'city is required'] },
  country: { type: String, required: [true, 'country is required'] },
});

const ordersSchema = new Schema<Orders>({
  productName: { type: String, required: [true, 'productName is required'] },
  price: { type: Number, required: [true, 'price is required'] },
  quantity: { type: Number, required: [true, 'Quantity is required'] },
});

const userSchema = new Schema<User>({
  userId: {
    type: Number,
    required: [true, 'UserId is required'],
    unique: true,
  },
  userName: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
  },
  password: { type: String, required: [true, 'Password is required'] },
  fullName: { type: userNameSchema, required: [true, 'UserName is required'] },
  age: { type: Number, required: [true, 'age is required'] },
  email: { type: String, required: [true, 'email is required'] },
  isActive: { type: Boolean, required: [true, 'isActive is required'] },
  hobbies: {
    type: [String],
    required: [true, 'Hobby is required'],
  },
  address: { type: addressSchema, required: [true, 'Address is required'] },
  orders: { type: [ordersSchema] },
});

// pre save middleware/ hook/ hashing password
userSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// pre save middleware / hook
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

// removing password
userSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

// static method
userSchema.statics.isUserExists = async function (userId: number) {
  const existingUser = await UserModel.findOne({ userId });
  return existingUser;
};

export const UserModel = model<User, UserModels>('User', userSchema);
