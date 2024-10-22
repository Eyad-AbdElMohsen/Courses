import mongoose, { Model, Schema, Document } from "mongoose"
import dotenv from 'dotenv'

dotenv.config()

const DB_URL = process.env.DB_URL

if(typeof DB_URL == 'string')
    mongoose.connect(DB_URL).then(()=> console.log('mongodb server start'))
else
    throw new Error('DB_URL must be a string');

const courseSchema: Schema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true }
});

interface ICourse extends Document{
    title: string,
    price: number
}

export const Course: Model<ICourse> = mongoose.model<ICourse>('Course', courseSchema);