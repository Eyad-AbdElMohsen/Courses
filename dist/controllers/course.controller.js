"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const httpStatusText_1 = require("../utils/httpStatusText");
const api_error_1 = __importDefault(require("../errors/api.error"));
const asyncWrapper_1 = require("../middlewares/asyncWrapper");
const coursesService = __importStar(require("../services/courses.service"));
const mongoose_1 = require("mongoose");
const ObjectId = mongoose_1.Types.ObjectId;
const getAllCourses = (0, asyncWrapper_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const limit = Number(req.query.limit);
    const skip = Number(req.query.skip);
    const courses = yield coursesService.getAllCourses(limit, skip);
    res.status(200).json({
        status: httpStatusText_1.SUCCESS,
        data: { courses }
    });
}));
exports.getAllCourses = getAllCourses;
const addNewCourse = (0, asyncWrapper_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newCourse = yield coursesService.addNewCourse(req.body);
    res.status(200).json({
        status: httpStatusText_1.SUCCESS,
        data: { newCourse }
    });
}));
exports.addNewCourse = addNewCourse;
const getCourse = (0, asyncWrapper_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield coursesService.getCourse(new ObjectId(req.params.courseId));
    if (!course) {
        throw new api_error_1.default('course not found ', 404);
    }
    res.status(200).json({
        status: httpStatusText_1.SUCCESS,
        data: { course }
    });
}));
exports.getCourse = getCourse;
const updateCourse = (0, asyncWrapper_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield coursesService.getCourse(new ObjectId(req.params.courseId));
    if (!course) {
        throw new api_error_1.default('course not found ', 404);
    }
    yield coursesService.updateCourse(req.body, course);
    res.status(200).json({
        status: httpStatusText_1.SUCCESS,
        data: { course }
    });
}));
exports.updateCourse = updateCourse;
const deleteCourse = (0, asyncWrapper_1.asyncWrapper)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield coursesService.getCourse(new ObjectId(req.params.courseId));
    if (!course) {
        throw new api_error_1.default('course not found ', 404);
    }
    yield coursesService.deleteCourse(new ObjectId(req.params.courseId));
    res.status(200).json({
        status: httpStatusText_1.SUCCESS,
        data: null
    });
}));
exports.deleteCourse = deleteCourse;
