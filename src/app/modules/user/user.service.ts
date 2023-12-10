import { TUser } from './user.interface';
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

export const UserServices = {
  createUserIntoDb,
  getAllUserFromDb,
  getSingleUserFromDb,
};
