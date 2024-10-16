import {  NextFunction, Request, Response } from "express";
import ApiError from "../errors/api.error";

const errorMiddleware = (err: unknown, req: Request, res: Response, next: NextFunction) => {
    let message = "Internal Server Error", code = 500, data
    if(err instanceof ApiError){
        message = err.message
        code = err.status
        data = err.data
    }else if(err instanceof Error){
        message = err.message
    }else if(typeof err == "string" ){
        message = err
    }
    res.status(code).json({
        status: 'Error',
        code: code,
        message: message,
        data: data
    })
}

export default errorMiddleware