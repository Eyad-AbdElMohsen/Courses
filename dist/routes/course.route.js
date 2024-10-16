"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const course_controller_1 = require("../controllers/course.controller");
const course_validator_1 = require("../validators/course.validator");
const courseRouter = (0, express_1.Router)();
courseRouter.route('/')
    .get(course_controller_1.getAllCourses)
    .post(course_validator_1.addCourseValidation, course_controller_1.addNewCourse);
courseRouter.route('/:courseId')
    .get(course_controller_1.getCourse)
    .patch(course_validator_1.updateCourseValidation, course_controller_1.updateCourse)
    .delete(course_controller_1.deleteCourse);
exports.default = courseRouter;
