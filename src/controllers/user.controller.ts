import { Request, Response } from "express";
import { User } from "../models/user.model";
import { SUCCESS } from "../utils/httpStatusText";
import ApiError from "../errors/api.error";
import { asyncWrapper } from "../middlewares/asyncWrapper";
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import { generateJWT } from "../utils/generateJWT";
import * as usersServices from '../services/users.service'


dotenv.config()

const getAllUsers = asyncWrapper( async(req: Request, res: Response) => {
    const limit: number = Number(req.query.limit);
    const skip: number = Number(req.query.skip);
    const users = await usersServices.getAllUsers(limit, skip)
    res.status(200).json({
        status: SUCCESS,
        data: {users}
    })
})


const postSignUp = asyncWrapper( async(req: Request, res: Response) => {
    const user = await usersServices.getUser(req.body.email)
    if(user){
        throw new ApiError('email already exists', 409, user)
    }
    const newUser = await usersServices.postSignUp(req.body, req.file?.filename)
    res.status(200).json({
        status: SUCCESS,
        data: {newUser}
    })
})

const postLogIn = asyncWrapper( async(req: Request, res: Response) => {
    const user = await usersServices.getUser(req.body.email)
    if(!user){
        throw new ApiError('email is not found', 404)
    }
    let correctPasword: boolean = await usersServices.correctPassword(req.body.password, user)
    if(!correctPasword){
        throw new ApiError("Password isn't correct" ,  400)
    }
    const token = usersServices.postLogIn(req.body.email, user)
    res.status(200).json({
        status: SUCCESS,
        data: {
            email: user.email,
            Name: user.firstName + ' ' + user.lastName,
            role: user.role,
            token
        }
    })
})

export {
    getAllUsers,
    postLogIn,
    postSignUp
}