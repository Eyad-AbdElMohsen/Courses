import { Router } from 'express';
import { addNewCourse, deleteCourse, getAllCourses, getCourse, updateCourse } from '../controllers/course.controller'
import { addCourseValidation, updateCourseValidation, getCourseValidation, deleteCourseValidation } from '../validators/course.validator';
import { allowedTo } from '../middlewares/allowedTo';
import { verifyToken } from '../middlewares/verifyToken';
import { Role } from '../utils/userRoles';
import { pagination } from '../utils/pagination';


const courseRouter = Router()

courseRouter.route('/')
                .get(pagination, getAllCourses)
                .post(verifyToken, allowedTo(Role.ADMIN, Role.MANAGER), addCourseValidation, addNewCourse)

courseRouter.route('/:courseId')
                .get(getCourseValidation, getCourse)
                .patch(verifyToken, allowedTo(Role.ADMIN, Role.MANAGER), updateCourseValidation, updateCourse)
                .delete(verifyToken, allowedTo(Role.ADMIN, Role.MANAGER), deleteCourseValidation, deleteCourse)

export default courseRouter

