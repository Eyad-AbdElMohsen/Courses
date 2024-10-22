import { Router } from 'express';
import { addNewCourse, deleteCourse, getAllCourses, getCourse, updateCourse } from '../controllers/course.controller'
import { addCourseValidation, updateCourseValidation, getCourseValidation, deleteCourseValidation } from '../validators/course.validator';
import { ADMIN, MANAGER } from '../utils/userRoles';
import { allowedTo } from '../middlewares/allowedTo';
import { verifyToken } from '../middlewares/verifyToken';

const courseRouter = Router()

courseRouter.route('/')
                .get(getAllCourses)
                .post(verifyToken, allowedTo(ADMIN, MANAGER), addCourseValidation, addNewCourse)

courseRouter.route('/:courseId')
                .get(getCourseValidation, getCourse)
                .patch(verifyToken, allowedTo(ADMIN, MANAGER), updateCourseValidation, updateCourse)
                .delete(verifyToken, allowedTo(ADMIN, MANAGER), deleteCourseValidation, deleteCourse)

export default courseRouter

