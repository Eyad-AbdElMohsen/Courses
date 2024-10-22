import { Request,Response, NextFunction } from "express";
import ApiError from "../errors/api.error";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { secretKey } from "../utils/generateJWT";
import { JwtPayload} from '../models/user.model'

dotenv.config()

export interface CustomRequest extends Request {
    currentUser?: JwtPayload; 
    headers: {
        authorization?: string
        [key: string]: string | string[] | undefined; 
    },
}

export const verifyToken = (req: CustomRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if(authHeader){
        const token = authHeader.split(' ')[1];
        try{
            if(secretKey){
                const user = jwt.verify(token, secretKey) as JwtPayload
                req.currentUser = user
                next()
            }else{
                throw new Error('secretKey must be a string')
            }
        }catch(err){
            throw new Error('error' + err)
        }
    }else{
        throw new ApiError('token is required ', 401)
    }
}