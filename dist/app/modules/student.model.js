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
exports.Student = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../config"));
const userNameSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        trim: true,
        required: [true, 'foyla nam cara dukte dimu na'],
        maxLength: [50, 'nam barik boyle bolmaydi'],
    },
    middleName: {
        type: String,
    },
    lastName: {
        type: String,
        required: true,
    },
});
const guardianSchema = new mongoose_1.Schema({
    fatherName: {
        type: String,
        required: true,
    },
    fatherOccupation: {
        type: String,
        required: true,
    },
    fatherContactNo: {
        type: String,
        required: true,
    },
    motherName: {
        type: String,
        required: true,
    },
    motherOccupation: {
        type: String,
        required: true,
    },
    motherContactNo: {
        type: String,
        required: true,
    },
});
const localGuradianSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    occupation: {
        type: String,
        required: true,
    },
    contactNo: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
});
const studentSchema = new mongoose_1.Schema({
    id: { type: String, required: [true, 'Id is required'], unique: true },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    name: {
        type: userNameSchema,
        required: true,
    },
    gender: {
        type: String,
        enum: {
            values: ['male', 'female', 'other'],
            message: "The gender field can only be one of the following: 'male', 'female', or 'other'.",
        },
        required: true,
    },
    dateOfBirth: { type: String },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    bloogGroup: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        required: true,
    },
    presentAddress: { type: String },
    permanentAddres: { type: String },
    guardian: {
        type: guardianSchema,
        required: true,
    },
    localGuardian: {
        type: localGuradianSchema,
        required: true,
    },
    profileImg: { type: String },
    isActive: {
        type: String,
        enum: ['active', 'blocked'],
        required: true,
        default: 'active',
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    toJSON: {
        virtuals: true,
    },
});
// virtual
studentSchema.virtual('fullName').get(function () {
    return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});
// pre save middleware /  hook : will work on create() save()
studentSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // console.log(this, 'pre save middleware');
        // hasing password and save into db
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const user = this; // this refering current proccessing document
        user.password = yield bcrypt_1.default.hash(user.password, Number(config_1.default.bcrypt_salt_rounds));
        next();
    });
});
// post save middleware /  hook
studentSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
});
//query meddleware
studentSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
studentSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
studentSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
    next();
});
//creating a custom static methods
studentSchema.statics.isUserExist = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield exports.Student.findOne({ id });
        return existingUser;
    });
};
/**
//creating a custom instance methods
studentSchema.methods.isUserExist = async function (id: string) {
  const existingUser = await Student.findOne({ id: id });
  return existingUser;
};
 */
exports.Student = (0, mongoose_1.model)('Student', studentSchema);
