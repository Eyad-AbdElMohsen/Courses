import { Router } from 'express';
import { getAllUsers, postLogIn, postSignUp } from '../controllers/user.controller';
import {loginValidation, signUpValidation} from '../validators/user.validator';
import { verifyToken } from '../middlewares/verifyToken';

const userRouter = Router()

userRouter.route('/')
            .get(verifyToken, getAllUsers)

userRouter.route('/signup')
            .post(signUpValidation, postSignUp)

userRouter.route('/login')
            .post(loginValidation, postLogIn)


export default userRouter