"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderValidationSchema = void 0;
const zod_1 = require("zod");
//zod validation
const nameValidationSchema = zod_1.z.object({
    firstName: zod_1.z.string().refine((value) => /^[A-Z][a-z]*$/.test(value), {
        message: 'First name must start with a capital letter and only contain letters',
    }),
    lastName: zod_1.z.string().refine((value) => /^[A-Z][a-z]*$/.test(value), {
        message: 'First name must start with a capital letter and only contain letters',
    }),
});
const addressValidationSchema = zod_1.z.object({
    street: zod_1.z.string({
        required_error: 'street is required',
        invalid_type_error: 'street must be a string',
    }),
    city: zod_1.z.string({
        required_error: 'city is required',
        invalid_type_error: 'city must be a string',
    }),
    country: zod_1.z.string({
        required_error: 'country is required',
        invalid_type_error: 'country must be a string',
    }),
}, {
    required_error: 'address is required',
    invalid_type_error: 'address must be an object',
});
exports.orderValidationSchema = zod_1.z.object({
    productName: zod_1.z.string({
        required_error: 'productName is required',
        invalid_type_error: 'productName must be a string',
    }),
    price: zod_1.z.number({
        required_error: 'price is required',
        invalid_type_error: 'price must be a number',
    }),
    quantity: zod_1.z.number({
        required_error: 'quantity is required',
        invalid_type_error: 'quantity must be a number',
    }),
});
const userValidationSchema = zod_1.z.object({
    userId: zod_1.z.number({
        required_error: 'userId is required',
        invalid_type_error: 'userId must be a number',
    }),
    username: zod_1.z.string({
        required_error: 'username is required',
        invalid_type_error: 'username must be a string',
    }),
    password: zod_1.z.string({
        required_error: 'password is required',
        invalid_type_error: 'password must be a string',
    }),
    fullName: nameValidationSchema,
    age: zod_1.z.number({
        required_error: 'age is required',
        invalid_type_error: 'age must be a number',
    }),
    email: zod_1.z
        .string({
        required_error: 'email is required',
        invalid_type_error: 'email must be a string',
    })
        .email(),
    isActive: zod_1.z.boolean({
        required_error: 'isActive is required',
        invalid_type_error: 'isActive must be a boolean',
    }),
    hobbies: zod_1.z.array(zod_1.z.string({
        required_error: 'hobbies is required',
        invalid_type_error: 'hobbies must be a string',
    })),
    address: addressValidationSchema,
    orders: zod_1.z.array(exports.orderValidationSchema).optional(),
});
exports.default = userValidationSchema;
