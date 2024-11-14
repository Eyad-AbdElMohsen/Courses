import { User } from "../models/user.model"
import { CreateUserData, IUser } from "../models/user.model"
import bcrypt from 'bcrypt'
import { generateJWT } from "../utils/generateJWT";


export const getAllUsers = async(limit: number, skip: number) => {
    const users = await User.find({}, {"__v": false, "password": false}).limit(limit).skip(skip)
    return users
}

export const getUser = async(email: string) :Promise<IUser | null> => {
    const user = await User.findOne({email})
    return user 
}


export const postSignUp = async(data: CreateUserData, fileName: string | undefined) => {
    const hashedPass = await bcrypt.hash(data.password, 10);
    const newUser = new User({
        ...data,
        avatar: fileName,
        password: hashedPass,
    })
    const token = await generateJWT({ 
        email: newUser.email, 
        role: newUser.role,
        id: newUser._id.toString(), 
    });
    newUser.token = token
    await newUser.save()
    return newUser
}

export const correctPassword = async(password: string, user: IUser) :Promise<boolean> =>{
    return await bcrypt.compare(password , user.password)
}

export const postLogIn = async(user: IUser) => {
    const token = await generateJWT({ email: user.email, id: user._id.toString(), role: user.role});
    user.token = token
    return token 
}