import { z } from 'zod';

const nameValidationSchema = z.object({
  firstName: z.string().refine((value) => /^[A-Z][a-z]*$/.test(value), {
    message:
      'First name must start with a capital letter and only contain letters',
  }),
  lastName: z.string().refine((value) => /^[A-Z][a-z]*$/.test(value), {
    message:
      'First name must start with a capital letter and only contain letters',
  }),
});

const addressValidationSchema = z.object(
  {
    street: z.string({
      required_error: 'street is required',
      invalid_type_error: 'street must be a string',
    }),
    city: z.string({
      required_error: 'city is required',
      invalid_type_error: 'city must be a string',
    }),
    country: z.string({
      required_error: 'country is required',
      invalid_type_error: 'country must be a string',
    }),
  },
  {
    required_error: 'address is required',
    invalid_type_error: 'address must be an object',
  },
);

export const orderValidationSchema = z.object({
  productName: z.string({
    required_error: 'productName is required',
    invalid_type_error: 'productName must be a string',
  }),
  price: z.number({
    required_error: 'price is required',
    invalid_type_error: 'price must be a number',
  }),
  quantity: z.number({
    required_error: 'quantity is required',
    invalid_type_error: 'quantity must be a number',
  }),
});

const userValidationSchema = z.object({
  userId: z.number({
    required_error: 'userId is required',
    invalid_type_error: 'userId must be a number',
  }),
  username: z.string({
    required_error: 'username is required',
    invalid_type_error: 'username must be a string',
  }),
  password: z.string({
    required_error: 'password is required',
    invalid_type_error: 'password must be a string',
  }),
  fullName: nameValidationSchema,
  age: z.number({
    required_error: 'age is required',
    invalid_type_error: 'age must be a number',
  }),
  email: z
    .string({
      required_error: 'email is required',
      invalid_type_error: 'email must be a string',
    })
    .email(),
  isActive: z.boolean({
    required_error: 'isActive is required',
    invalid_type_error: 'isActive must be a boolean',
  }),
  hobbies: z.array(
    z.string({
      required_error: 'hobbies is required',
      invalid_type_error: 'hobbies must be a string',
    }),
  ),
  address: addressValidationSchema,
  orders: z.array(orderValidationSchema).optional(),
});

export default userValidationSchema;
