import { Request, Response } from 'express';
import { userServices } from './user.services';
import { userValidationSchema } from './user.validation';

// create user
const createUser = async (req: Request, res: Response) => {
  try {
    // data validation using Zod
    const { user: userData } = req.body;
    const zodParsedData = userValidationSchema.parse(userData);

    const result = await userServices.createUserIntoDB(zodParsedData);

    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error,
    });
  }
};

export const UserControllers = {
  createUser,
};
