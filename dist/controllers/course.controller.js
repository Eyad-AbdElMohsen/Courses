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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCourse = exports.updateCourse = exports.getCourse = exports.addNewCourse = exports.getAllCourses = void 0;
const express_validator_1 = require("express-validator");
const course_model_1 = require("../models/course.model");
const getAllCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courses = yield course_model_1.Course.find();
        res.status(200).json(courses);
    }
    catch (err) {
        res.status(500).json({ message: 'Error getting all courses: ', err });
    }
});
exports.getAllCourses = getAllCourses;
const addNewCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json(errors.array());
        return;
    }
    try {
        const course = yield course_model_1.Course.findOne({ title: req.body.title });
        if (course) {
            res.status(409).json({
                msg: 'this course alreay exists'
            });
            return;
        }
        else {
            const newCourse = new course_model_1.Course(req.body);
            yield newCourse.save();
            res.status(201).json(newCourse);
        }
    }
    catch (err) {
        res.status(500).json({ message: 'Error adding new course: ', err });
    }
});
exports.addNewCourse = addNewCourse;
const getCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const course = yield course_model_1.Course.findById(req.params.courseId);
        if (!course) {
            res.status(404).json({
                msg: 'course not found'
            });
            return;
        }
        res.status(200).json(course);
    }
    catch (err) {
        res.status(500).json({ message: 'Error getting course: ', err });
    }
});
exports.getCourse = getCourse;
const updateCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json(errors.array());
        return;
    }
    try {
        const course = yield course_model_1.Course.findById(req.params.courseId);
        if (!course) {
            res.status(404).json({
                msg: 'course not found'
            });
            return;
        }
        yield course_model_1.Course.updateOne({ _id: req.params.courseId }, Object.assign({}, req.body));
        res.status(200).json({
            msg: 'Course is updated successfully'
        });
    }
    catch (err) {
        res.status(500).json({ message: 'Error updating course: ', err });
    }
});
exports.updateCourse = updateCourse;
const deleteCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const course = yield course_model_1.Course.findById(req.params.courseId);
        if (!course) {
            res.status(404).json({
                msg: 'course not found'
            });
            return;
        }
        yield course_model_1.Course.deleteOne({ _id: req.params.courseId });
        res.status(200).json({
            msg: 'Course is deleted successfully',
        });
    }
    catch (err) {
        res.status(500).json({ message: 'Error deleting course: ', err });
    }
});
exports.deleteCourse = deleteCourse;
