import { NextFunction, Request, response, Response } from "express";
import { validationResult } from "express-validator";
import { Course } from '../models/course.model'
import { SUCCESS } from "../utils/httpStatusText";
import ApiError from "../errors/api.error";
import { asyncWrapper } from "../middlewares/asyncWrapper";


const getAllCourses = asyncWrapper( async(req: Request, res: Response) => {
    const limit: number = parseInt(String(req.query.limit)) || 10;
    const page: number = parseInt(String(req.query.page)) || 1;
    const skip: number = (page - 1) * limit
    const courses = await Course.find({}, {"__v": false}).limit(limit).skip(skip)
    res.status(200).json({
        status: SUCCESS,
        data: {courses}
    })
})

const addNewCourse = asyncWrapper( async(req: Request, res: Response) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        throw new ApiError('validation error ', 400, errors.array())
    }
    const course = await Course.findOne({title: req.body.title})
    if(course){
        throw new ApiError('course already exists', 409, course)
    }
    const newCourse = new Course(req.body)
    await newCourse.save()
    res.status(201).json(newCourse)
})


const getCourse = asyncWrapper( async(req: Request, res: Response) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        throw new ApiError('validation error ', 400, errors.array())
    }
    const course = await Course.findById(req.params.courseId)
    if(!course){
        throw new ApiError('course not found ', 404)
    }
    res.status(200).json({
        status: SUCCESS,
        data: {course}
    })
})


const updateCourse = asyncWrapper (async(req: Request, res: Response) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        throw new ApiError('validation error ', 400, errors.array())
    }
    const course = await Course.findById(req.params.courseId)
    if(!course){
        throw new ApiError('course not found ', 404)
    }
    await Course.updateOne({_id: req.params.courseId}, {...req.body})
    res.status(200).json({
        status: SUCCESS,
        data: {course}
    })
})



const deleteCourse = asyncWrapper (async(req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        throw new ApiError('validation error ', 400, errors.array())
    }
    const course = await Course.findById(req.params.courseId)
    if(!course){
        throw new ApiError('course not found ', 404)
    }
    await Course.deleteOne({_id: req.params.courseId})
    res.status(200).json({
        status: SUCCESS,
        data: null
    })
})


export { 
    getAllCourses,
    addNewCourse,
    getCourse,
    updateCourse, 
    deleteCourse
}