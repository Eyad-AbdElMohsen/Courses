import { Response, NextFunction } from "express"
import ApiError from "../errors/api.error";
import {CustomRequest} from "../middlewares/verifyToken";
import { Role } from "../utils/userRoles";


export const allowedTo = (...roles: Role[]) => {
    return (req: CustomRequest, res: Response, next: NextFunction) => {
        if(req.currentUser){
            if(roles.includes(req.currentUser.role)){
                next()
            }else{
                throw new ApiError('You are not allowed to this action', 401)
            }
        }else{
            throw new Error('you should login')
        }
    };
};