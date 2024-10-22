"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const user_validator_1 = require("../validators/user.validator");
const verifyToken_1 = require("../middlewares/verifyToken");
const allowedTo_1 = require("../middlewares/allowedTo");
const multer_1 = require("../utils/multer");
const userRoles_1 = require("../utils/userRoles");
const userRouter = (0, express_1.Router)();
userRouter.route('/')
    .get(verifyToken_1.verifyToken, (0, allowedTo_1.allowedTo)(userRoles_1.Role.ADMIN, userRoles_1.Role.MANAGER), verifyToken_1.verifyToken, user_controller_1.getAllUsers);
userRouter.route('/signup')
    .post(multer_1.upload.single('avatar'), user_validator_1.signUpValidation, user_controller_1.postSignUp);
userRouter.route('/login')
    .post(user_validator_1.loginValidation, user_controller_1.postLogIn);
exports.default = userRouter;
