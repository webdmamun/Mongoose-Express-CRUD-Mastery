import { User } from './user.interface';
import { UserModel } from './user.model';

// create user
const createUserIntoDB = async (user: User) => {
  if (await UserModel.isUserExists(user.userId)) {
    throw new Error('User already exists!');
  }
  const result = await UserModel.create(user);

  return result;
};

export const userServices = {
  createUserIntoDB,
};
