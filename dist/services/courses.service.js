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
exports.deleteCourse = exports.updateCourse = exports.getCourse = exports.addNewCourse = exports.getAllCourses = void 0;
const api_error_1 = __importDefault(require("../errors/api.error"));
const course_model_1 = require("../models/course.model");
const getAllCourses = (limit, skip) => __awaiter(void 0, void 0, void 0, function* () {
    const courses = yield course_model_1.Course.find({}, { "__v": false }).limit(limit).skip(skip);
    return courses;
});
exports.getAllCourses = getAllCourses;
const addNewCourse = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield course_model_1.Course.findOne({ title: data.title });
    if (course) {
        throw new api_error_1.default('course already exists', 409, course);
    }
    const newCourse = new course_model_1.Course(data);
    yield newCourse.save();
    return newCourse;
});
exports.addNewCourse = addNewCourse;
const getCourse = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield course_model_1.Course.findById(id);
    return course;
});
exports.getCourse = getCourse;
const updateCourse = (data, course) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    course.title = (_a = data.title) !== null && _a !== void 0 ? _a : course.title; // nullish operator
    course.price = (_b = data.price) !== null && _b !== void 0 ? _b : course.price;
    yield course.save();
    return course;
});
exports.updateCourse = updateCourse;
const deleteCourse = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield course_model_1.Course.deleteOne({ _id: id });
});
exports.deleteCourse = deleteCourse;
