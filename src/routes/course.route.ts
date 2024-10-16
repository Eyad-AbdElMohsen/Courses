import { Router } from 'express';
import { addNewCourse, deleteCourse, getAllCourses, getCourse, updateCourse } from '../controllers/course.controller'
import { addCourseValidation, updateCourseValidation, getCourseValidation, deleteCourseValidation } from '../validators/course.validator';

const courseRouter = Router()

courseRouter.route('/')
                .get(getAllCourses)
                .post(addCourseValidation, addNewCourse)

courseRouter.route('/:courseId')
                .get(getCourseValidation, getCourse)
                .patch(updateCourseValidation, updateCourse)
                .delete(deleteCourseValidation, deleteCourse)

export default courseRouter

