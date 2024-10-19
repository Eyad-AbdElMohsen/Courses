import {body} from 'express-validator'

export const signUpValidation = [
    body('firstName')
        .matches(/^[A-Za-z\s]+$/).withMessage("Name can only contain letters and spaces"),
    body('lastName')
        .matches(/^[A-Za-z\s]+$/).withMessage("Name can only contain letters and spaces"),
    body('email')
        .isEmail()
        .withMessage('field must be valid email'),
    body('password')
        .isLength({ min: 8, max: 64 }).withMessage("Password must be between 8 and 64 characters long")
        .matches(/(?=.*\d)/).withMessage("Password must contain at least one number")
        .matches(/(?=.*[a-z])/).withMessage("Password must contain at least one lowercase letter")
        .matches(/(?=.*[A-Z])/).withMessage("Password must contain at least one uppercase letter"),
]

export const loginValidation = [
    body('email')
        .isEmail()
        .withMessage('field must be valid email'),
    body('password')
        .isLength({ min: 8, max: 64 }).withMessage("Password must be between 8 and 64 characters long")
        .matches(/(?=.*\d)/).withMessage("Password must contain at least one number")
        .matches(/(?=.*[a-z])/).withMessage("Password must contain at least one lowercase letter")
        .matches(/(?=.*[A-Z])/).withMessage("Password must contain at least one uppercase letter"),
]