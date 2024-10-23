import { Request,Response, NextFunction } from "express";
import ApiError from "../errors/api.error";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { secretKey } from "../utils/generateJWT";
import { JwtPayload} from '../models/user.model'
import { asyncWrapper } from "./asyncWrapper";

dotenv.config()

export interface CustomRequest extends Request {
    currentUser?: JwtPayload; 
    headers: {
        authorization?: string
        [key: string]: string | string[] | undefined; 
    },
}

export const verifyToken = asyncWrapper(async(req: CustomRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if(!authHeader){
        throw new ApiError('token is required ', 401)
    }
    const token = authHeader.split(' ')[1];
    if(!secretKey){
        throw new ApiError('internal server error', 500)
    }
    const user = jwt.verify(token, secretKey) as JwtPayload
    req.currentUser = user
    next()
})