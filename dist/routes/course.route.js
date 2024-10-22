"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const course_controller_1 = require("../controllers/course.controller");
const course_validator_1 = require("../validators/course.validator");
const userRoles_1 = require("../utils/userRoles");
const allowedTo_1 = require("../middlewares/allowedTo");
const verifyToken_1 = require("../middlewares/verifyToken");
const courseRouter = (0, express_1.Router)();
courseRouter.route('/')
    .get(course_controller_1.getAllCourses)
    .post(verifyToken_1.verifyToken, (0, allowedTo_1.allowedTo)(userRoles_1.ADMIN, userRoles_1.MANAGER), course_validator_1.addCourseValidation, course_controller_1.addNewCourse);
courseRouter.route('/:courseId')
    .get(course_validator_1.getCourseValidation, course_controller_1.getCourse)
    .patch(verifyToken_1.verifyToken, (0, allowedTo_1.allowedTo)(userRoles_1.ADMIN, userRoles_1.MANAGER), course_validator_1.updateCourseValidation, course_controller_1.updateCourse)
    .delete(verifyToken_1.verifyToken, (0, allowedTo_1.allowedTo)(userRoles_1.ADMIN, userRoles_1.MANAGER), course_validator_1.deleteCourseValidation, course_controller_1.deleteCourse);
exports.default = courseRouter;
