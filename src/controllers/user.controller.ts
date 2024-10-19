import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { User } from "../models/user.model";
import { SUCCESS } from "../utils/httpStatusText";
import ApiError from "../errors/api.error";
import { asyncWrapper } from "../middlewares/asyncWrapper";
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import { generateJWT } from "../utils/generateJWT";
import { verifyToken } from "../middlewares/verifyToken";

dotenv.config()

const getAllUsers = asyncWrapper( async(req: Request, res: Response) => {
    const limit: number = parseInt(String(req.query.limit)) || 10;
    const page: number = parseInt(String(req.query.page)) || 1;
    const skip: number = (page - 1) * limit
    const users = await User.find({}, {"__v": false, "password": false}).limit(limit).skip(skip)
    res.status(200).json({
        status: SUCCESS,
        data: {users}
    })
})


const postSignUp = asyncWrapper( async(req: Request, res: Response) => {
    const password = req.body.password
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        throw new ApiError('validation error ', 400, errors.array())
    }
    const user = await User.findOne({email: req.body.email})
    if(user){
        throw new ApiError('email already exists', 409, user)
    }
    const hashedPass = await bcrypt.hash(password, 10);
    const newUser = new User({
        ...req.body,
        password: hashedPass,
    })
    const token = await generateJWT({ email: newUser.email, id: newUser._id.toString()});
    newUser.token = token
    await newUser.save()
    res.status(200).json({
        status: SUCCESS,
        data: {newUser}
    })
})

const postLogIn = asyncWrapper( async(req: Request, res: Response) => {
    const {email , password} = req.body
    const user = await User.findOne({email: email})
    if(!user){
        throw new ApiError('email is not found', 404)
    }
    let correctPasword: boolean = await bcrypt.compare(password , user.password)
    if(!correctPasword){
        throw new ApiError("Password isn't correct" ,  400)
    }
    // login successfully
    const token = await generateJWT({ email: user.email, id: user._id.toString()});
    user.token = token
    res.status(200).json({
        status: SUCCESS,
        data: {
            email: user.email,
            Name: user.firstName + ' ' + user.lastName,
            token
        }
    })
})

export {
    getAllUsers,
    postLogIn,
    postSignUp
}