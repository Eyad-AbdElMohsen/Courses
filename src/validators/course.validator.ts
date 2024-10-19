import {body, param} from 'express-validator'

export const addCourseValidation = [
    body('title')
        .isLength({min: 2})
        .withMessage('title should be at least 2 chars'),
    body('price') 
        .notEmpty()
        .withMessage('price is required')
        .isNumeric()
        .withMessage('price should be numebr')
]

export const updateCourseValidation = [
    param('courseId')
        .isMongoId()
        .withMessage('invalid id'),
    body('title')
        .optional()
        .isLength({min: 2})
        .withMessage('title should be at least 2 chars'),
    body('price') 
        .optional()
        .notEmpty()
        .withMessage('price is required')
        .isNumeric()
        .withMessage('price should be numebr')
]

export const getCourseValidation = [
    param('courseId')
    .isMongoId()
    .withMessage('invalid id')
]

export const deleteCourseValidation = [
    param('courseId')
    .isMongoId()
    .withMessage('invalid id')
]