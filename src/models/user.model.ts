import mongoose, { Model, Schema, Document, ObjectId } from "mongoose"
import dotenv from 'dotenv'

dotenv.config()

const DB_URL = process.env.MONGO_URL

if(typeof DB_URL == 'string')
    mongoose.connect(DB_URL).then(()=> console.log('mongodb server start'))
else
    throw new Error('DB_URL must be a string');

const userSchema: Schema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { 
        type: String,
        unique: true,
        required: true,
    },
    password: { type: String, required: true },
    token: {type: String}
});

interface Iuser extends Document{
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    token?: string,
    _id: ObjectId | string;
}

export interface JwtPayload {
    email: string;
    id: string;
}

export const User: Model<Iuser> = mongoose.model<Iuser>('User', userSchema);