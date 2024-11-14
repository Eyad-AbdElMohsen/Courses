import { Router } from 'express';
import { getAllUsers, postLogIn, postSignUp } from '../controllers/user.controller';
import {loginValidation, signUpValidation} from '../validators/user.validator';
import { verifyToken } from '../middlewares/verifyToken';
import { allowedTo } from '../middlewares/allowedTo';
import { upload } from '../utils/multer';
import { Role } from '../utils/userRoles';
import { pagination } from '../utils/pagination';
import validationMiddleware from '../middlewares/validation.middleware';

const userRouter = Router()

userRouter.route('/')
            .get(verifyToken, allowedTo(Role.ADMIN, Role.MANAGER),  pagination, getAllUsers)

userRouter.route('/signup')
            .post(upload.single('avatar'), signUpValidation, validationMiddleware, postSignUp)

userRouter.route('/login')
            .post(loginValidation,validationMiddleware, postLogIn)


export default userRouter