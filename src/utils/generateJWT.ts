import jwt from 'jsonwebtoken'
import { JwtPayload } from "../models/user.model";

export const secretKey = process.env.JWT_SECRET
export const generateJWT = async (payload: JwtPayload): Promise<string> => {
    //generate token 
    if(secretKey){
        const token = jwt.sign(
            payload as JwtPayload,
            // in terminal -> require('crypto').randomBytes(32).toString('hex') 
            secretKey,
            {expiresIn: '1h'}
        );
        return token 
    }else{
        throw new Error('secretKey must be a string')
    }
}
