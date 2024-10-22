import mongoose, { Model, Schema, Document, ObjectId } from "mongoose"
import dotenv from 'dotenv'
import { ADMIN, MANAGER, USER } from "../utils/userRoles"

dotenv.config()

const DB_URL = process.env.MONGO_URL

if(typeof DB_URL == 'string')
    mongoose.connect(DB_URL).then(()=> console.log('mongodb server start'))
else
    throw new Error('DB_URL must be a string');

const userSchema: Schema = new mongoose.Schema({
    firstName: { 
        type: String, 
        required: true 
    },
    lastName: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String,
        unique: true,
        required: true,
    },
    password: { 
        type: String, 
        required: true 
    },
    token: {
        type: String
    },
    role: {
        type: String,
        enum: [USER, ADMIN, MANAGER],
        default: USER
    },
    avatar: {
        type: String,
        default: "profile.png"
    }
});

interface Iuser extends Document{
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    token?: string,
    role: string;
    avatar: string,
    _id: ObjectId | string;
}

export interface JwtPayload {
    email: string;
    role: string,
    id: string;
}

export const User: Model<Iuser> = mongoose.model<Iuser>('User', userSchema);