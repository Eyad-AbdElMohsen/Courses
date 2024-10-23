"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const user_validator_1 = require("../validators/user.validator");
const verifyToken_1 = require("../middlewares/verifyToken");
const allowedTo_1 = require("../middlewares/allowedTo");
const multer_1 = require("../utils/multer");
const userRoles_1 = require("../utils/userRoles");
const pagination_1 = require("../utils/pagination");
const validation_middleware_1 = __importDefault(require("../middlewares/validation.middleware"));
const userRouter = (0, express_1.Router)();
userRouter.route('/')
    .get(verifyToken_1.verifyToken, (0, allowedTo_1.allowedTo)(userRoles_1.Role.ADMIN, userRoles_1.Role.MANAGER), verifyToken_1.verifyToken, pagination_1.pagination, user_controller_1.getAllUsers);
userRouter.route('/signup')
    .post(multer_1.upload.single('avatar'), user_validator_1.signUpValidation, validation_middleware_1.default, user_controller_1.postSignUp);
userRouter.route('/login')
    .post(user_validator_1.loginValidation, validation_middleware_1.default, user_controller_1.postLogIn);
exports.default = userRouter;
