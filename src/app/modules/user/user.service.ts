import { TOrder, TUser } from './user.interface';
import { User } from './user.model';

// post-a-user
const createUserIntoDb = async (user: TUser) => {
  const result = await User.create(user);
  const data = await User.findOne({ userId: result.userId }).select(
    '-_id -__v -orders',
  );
  return data;
};

// get-all-users"
const getAllUserFromDb = async () => {
  const result = await User.find(
    {},
    { username: 1, fullName: 1, age: 1, email: 1, address: 1, _id: 0 },
  );

  return result;
};

// get-a-user-by-id"
const getSingleUserFromDb = async (id: number) => {
  const user = await User.isUserExists(id);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

// put-or-update-a-user"
const updateUserIntoDb = async (id: number, user: TUser) => {
  const existsUser = await User.isUserExists(id);
  if (!existsUser) {
    throw new Error('User not found');
  }

  const userData = await User.updateOne({ userId: id }, user);
  const userInfo = await User.findOne(
    { userId: id },
    { _id: 0, orders: 0, __v: 0 },
  );
  return { userData, userInfo };
};

// delete-a-user-from-db"
const deleteUserFromDb = async (id: number) => {
  const existsUser = await User.isUserExists(id);
  if (!existsUser) {
    throw new Error('User not found');
  }
  const result = await User.deleteOne({ userId: id });
  return result;
};

// put-add-new-product"
const addNewProductIntoOrder = async (id: number, product: TOrder) => {
  const existsUser = await User.isUserExists(id);
  if (!existsUser) {
    throw new Error('User not found');
  }
  const result = await User.updateOne(
    { userId: id },
    { $addToSet: { orders: product } },
  );
  return result;
};

// get-user-order
const getUserOrdersFromDb = async (id: number) => {
  const existsUser = await User.isUserExists(id);
  if (!existsUser) {
    throw new Error('User not found');
  }

  const result = await User.findOne({ userId: id }, { orders: 1, _id: 0 });
  return result;
};

// Total Price
const getUserOrderTotalAmount = async (id: number) => {
  const existsUser = await User.isUserExists(id);
  if (!existsUser) {
    throw new Error('User not found');
  }

  const result = await User.aggregate([
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
};

export const UserServices = {
  createUserIntoDb,
  getAllUserFromDb,
  getSingleUserFromDb,
  updateUserIntoDb,
  deleteUserFromDb,
  addNewProductIntoOrder,
  getUserOrdersFromDb,
  getUserOrderTotalAmount,
};
