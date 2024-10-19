import { Request,Response, NextFunction } from "express";
import ApiError from "../errors/api.error";
import { asyncWrapper } from "./asyncWrapper";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { secretKey } from "../utils/generateJWT";

dotenv.config()

export interface CustomRequest extends Request {
    headers: {
        authorization?: string
        [key: string]: string | string[] | undefined; 
    };
}

export const verifyToken = (req: CustomRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if(authHeader){
        const token = Array.isArray(authHeader) ? authHeader[0] : authHeader.split(' ')[1];
        try{
            if(secretKey){
                jwt.verify(token, secretKey) as jwt.JwtPayload
                console.log("done")
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