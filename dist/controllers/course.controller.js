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
const express_validator_1 = require("express-validator");
const course_model_1 = require("../models/course.model");
const httpStatusText_1 = require("../utils/httpStatusText");
const api_error_1 = __importDefault(require("../errors/api.error"));
const getAllCourses = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const limit = parseInt(String(req.query.limit)) || 10;
        const page = parseInt(String(req.query.page)) || 1;
        const skip = (page - 1) * limit;
        const courses = yield course_model_1.Course.find({}, { "__v": false }).limit(limit).skip(skip);
        res.status(200).json({
            status: httpStatusText_1.SUCCESS,
            data: { courses }
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getAllCourses = getAllCourses;
const addNewCourse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            throw new api_error_1.default('validation error ', 400, errors.array());
        }
        const course = yield course_model_1.Course.findOne({ title: req.body.title });
        if (course) {
            throw new api_error_1.default('course already exists', 409, course);
        }
        const newCourse = new course_model_1.Course(req.body);
        yield newCourse.save();
        res.status(201).json(newCourse);
    }
    catch (err) {
        next(err);
    }
});
exports.addNewCourse = addNewCourse;
const getCourse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            throw new api_error_1.default('validation error ', 400, errors.array());
        }
        const course = yield course_model_1.Course.findById(req.params.courseId);
        if (!course) {
            throw new api_error_1.default('course not found ', 404);
        }
        res.status(200).json({
            status: httpStatusText_1.SUCCESS,
            data: { course }
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getCourse = getCourse;
const updateCourse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            throw new api_error_1.default('validation error ', 400, errors.array());
        }
        const course = yield course_model_1.Course.findById(req.params.courseId);
        if (!course) {
            throw new api_error_1.default('course not found ', 404);
        }
        yield course_model_1.Course.updateOne({ _id: req.params.courseId }, Object.assign({}, req.body));
        res.status(200).json({
            status: httpStatusText_1.SUCCESS,
            data: { course }
        });
    }
    catch (err) {
        next(err);
    }
});
exports.updateCourse = updateCourse;
const deleteCourse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            throw new api_error_1.default('validation error ', 400, errors.array());
        }
        const course = yield course_model_1.Course.findById(req.params.courseId);
        if (!course) {
            throw new api_error_1.default('course not found ', 404);
        }
        yield course_model_1.Course.deleteOne({ _id: req.params.courseId });
        res.status(200).json({
            status: httpStatusText_1.SUCCESS,
            data: null
        });
    }
    catch (err) {
        next(err);
    }
});
exports.deleteCourse = deleteCourse;
