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
exports.StudentControllers = void 0;
const student_validation_1 = __importDefault(require("./student.validation"));
const student_service_1 = require("./student.service");
const createStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { student: studentData } = req.body;
        const zodParsedData = student_validation_1.default.parse(studentData);
        const result = yield student_service_1.StudentServices.createStudentIntoDb(zodParsedData);
        res.status(200).json({
            success: true,
            message: 'Student Created Successfully',
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'something went wrong',
            error: err,
        });
    }
    // it wil call service function to send this data.
});
const getAllStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield student_service_1.StudentServices.getAllStudentsFromDb();
        res.status(200).json({
            success: true,
            message: 'All Students are retieved successfully',
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'something went wrong',
            error: err,
        });
    }
});
const getSingleStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const studentId = req.params.studentId;
        const result = yield student_service_1.StudentServices.getSingleStudentFromBd(studentId);
        res.status(200).json({
            success: true,
            message: 'Student is retieved successfully',
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'something went wrong',
            error: err,
        });
    }
});
const deleteStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const studentId = req.params.studentId;
        const result = yield student_service_1.StudentServices.deleteStudentFromDb(studentId);
        res.status(200).json({
            success: true,
            message: 'Student is deleted successfully',
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'something went wrong',
            error: err,
        });
    }
});
exports.StudentControllers = {
    createStudent,
    getAllStudents,
    getSingleStudent,
    deleteStudent,
};
