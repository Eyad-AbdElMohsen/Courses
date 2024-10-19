"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidation = exports.signUpValidation = void 0;
const express_validator_1 = require("express-validator");
exports.signUpValidation = [
    (0, express_validator_1.body)('firstName')
        .matches(/^[A-Za-z\s]+$/).withMessage("Name can only contain letters and spaces"),
    (0, express_validator_1.body)('lastName')
        .matches(/^[A-Za-z\s]+$/).withMessage("Name can only contain letters and spaces"),
    (0, express_validator_1.body)('email')
        .isEmail()
        .withMessage('field must be valid email'),
    (0, express_validator_1.body)('password')
        .isLength({ min: 8, max: 64 }).withMessage("Password must be between 8 and 64 characters long")
        .matches(/(?=.*\d)/).withMessage("Password must contain at least one number")
        .matches(/(?=.*[a-z])/).withMessage("Password must contain at least one lowercase letter")
        .matches(/(?=.*[A-Z])/).withMessage("Password must contain at least one uppercase letter"),
];
exports.loginValidation = [
    (0, express_validator_1.body)('email')
        .isEmail()
        .withMessage('field must be valid email'),
    (0, express_validator_1.body)('password')
        .isLength({ min: 8, max: 64 }).withMessage("Password must be between 8 and 64 characters long")
        .matches(/(?=.*\d)/).withMessage("Password must contain at least one number")
        .matches(/(?=.*[a-z])/).withMessage("Password must contain at least one lowercase letter")
        .matches(/(?=.*[A-Z])/).withMessage("Password must contain at least one uppercase letter"),
];
