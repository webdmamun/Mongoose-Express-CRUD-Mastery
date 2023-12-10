import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import UserModel, { TAddress, TName, TOrder, TUser } from './user.interface';
import config from '../../config';

const nameSchema = new Schema<TName>({
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

const addressSchema = new Schema<TAddress>({
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

const orderSchema = new Schema<TOrder>({
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

const UserSchema = new Schema<TUser, UserModel>({
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
UserSchema.pre('save', async function (next) {
  const user = this; // eslint-disable-line
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcryptSaltRounds),
  );
  next();
});

// Protect Password from showing
UserSchema.methods.toJSON = function () {
  const user = this; // eslint-disable-line
  const userObject = user.toObject();
  delete userObject.password;
  return userObject;
};

// Check User Exists or not with Static
UserSchema.statics.isUserExists = async function (id: number) {
  const user = await User.findOne(
    { userId: id },
    { password: 0, _id: 0, orders: 0, __v: 0 },
  );
  return user;
};

export const User = model<TUser, UserModel>('User', UserSchema);
