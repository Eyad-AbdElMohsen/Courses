import { Router } from 'express';
import { addNewCourse, deleteCourse, getAllCourses, getCourse, updateCourse } from '../controllers/course.controller'
import { addCourseValidation, updateCourseValidation } from '../validators/course.validator';

const courseRouter = Router()

courseRouter.route('/')
                .get(getAllCourses)
                .post(addCourseValidation, addNewCourse)

courseRouter.route('/:courseId')
                .get(getCourse)
                .patch(updateCourseValidation, updateCourse)
                .delete(deleteCourse)

export { courseRouter }

