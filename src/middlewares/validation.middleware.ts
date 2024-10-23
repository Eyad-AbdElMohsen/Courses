import { NextFunction, Request, Response } from "express";
import { asyncWrapper } from "./asyncWrapper";
import { validationResult } from "express-validator";
import ApiError from "../errors/api.error";


const validationMiddleware = asyncWrapper(async(req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        throw new ApiError('validation error ', 400, errors.array())
    }
    next()
})

export default validationMiddleware