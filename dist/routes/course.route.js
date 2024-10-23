"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const course_controller_1 = require("../controllers/course.controller");
const course_validator_1 = require("../validators/course.validator");
const allowedTo_1 = require("../middlewares/allowedTo");
const verifyToken_1 = require("../middlewares/verifyToken");
const userRoles_1 = require("../utils/userRoles");
const pagination_1 = require("../utils/pagination");
const validation_middleware_1 = __importDefault(require("../middlewares/validation.middleware"));
const courseRouter = (0, express_1.Router)();
courseRouter.route('/')
    .get(pagination_1.pagination, course_controller_1.getAllCourses)
    .post(verifyToken_1.verifyToken, (0, allowedTo_1.allowedTo)(userRoles_1.Role.ADMIN, userRoles_1.Role.MANAGER), course_validator_1.addCourseValidation, validation_middleware_1.default, course_controller_1.addNewCourse);
courseRouter.route('/:courseId')
    .get(course_validator_1.getCourseValidation, course_controller_1.getCourse)
    .patch(verifyToken_1.verifyToken, (0, allowedTo_1.allowedTo)(userRoles_1.Role.ADMIN, userRoles_1.Role.MANAGER), course_validator_1.updateCourseValidation, validation_middleware_1.default, course_controller_1.updateCourse)
    .delete(verifyToken_1.verifyToken, (0, allowedTo_1.allowedTo)(userRoles_1.Role.ADMIN, userRoles_1.Role.MANAGER), course_validator_1.deleteCourseValidation, validation_middleware_1.default, course_controller_1.deleteCourse);
exports.default = courseRouter;
