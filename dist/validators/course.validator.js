"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCourseValidation = exports.addCourseValidation = void 0;
const express_validator_1 = require("express-validator");
exports.addCourseValidation = [
    (0, express_validator_1.body)('title')
        .isLength({ min: 2 })
        .withMessage('title should be at least 2 chars'),
    (0, express_validator_1.body)('price')
        .notEmpty()
        .withMessage('price is required')
        .isNumeric()
        .withMessage('price should be numebr')
];
exports.updateCourseValidation = [
    (0, express_validator_1.body)('title')
        .optional()
        .isLength({ min: 2 })
        .withMessage('title should be at least 2 chars'),
    (0, express_validator_1.body)('price')
        .optional()
        .notEmpty()
        .withMessage('price is required')
        .isNumeric()
        .withMessage('price should be numebr')
];
