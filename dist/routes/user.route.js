"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const user_validator_1 = require("../validators/user.validator");
const verifyToken_1 = require("../middlewares/verifyToken");
const userRouter = (0, express_1.Router)();
userRouter.route('/')
    .get(verifyToken_1.verifyToken, user_controller_1.getAllUsers);
userRouter.route('/signup')
    .post(user_validator_1.signUpValidation, user_controller_1.postSignUp);
userRouter.route('/login')
    .post(user_validator_1.loginValidation, user_controller_1.postLogIn);
exports.default = userRouter;
