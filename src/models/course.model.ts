import mongoose, { Model, Schema, Document } from "mongoose"

const DB_URL = "mongodb://localhost:27017"
mongoose.connect(DB_URL).then(()=> console.log('mongodb server start'))

const courseSchema: Schema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true }
});

interface ICourse extends Document{
    title: string,
    price: number
}

export const Course: Model<ICourse> = mongoose.model<ICourse>('Course', courseSchema);