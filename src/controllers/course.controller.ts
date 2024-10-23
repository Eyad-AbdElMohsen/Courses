import { NextFunction, Request, response, Response } from "express";
import { SUCCESS } from "../utils/httpStatusText";
import ApiError from "../errors/api.error";
import { asyncWrapper } from "../middlewares/asyncWrapper";
import * as coursesService from '../services/courses.service'
import {Types} from "mongoose";

const ObjectId = Types.ObjectId

const getAllCourses = asyncWrapper( async(req: Request, res: Response) => {
    const limit: number = Number(req.query.limit);
    const skip: number = Number(req.query.skip);
    const courses = await coursesService.getAllCourses(limit, skip)
    res.status(200).json({
        status: SUCCESS,
        data: {courses}
    })
})

const addNewCourse = asyncWrapper( async(req: Request, res: Response) => {
    const newCourse = await coursesService.addNewCourse(req.body)
    res.status(200).json({
        status: SUCCESS,
        data: {newCourse}
    })
})


const getCourse = asyncWrapper( async(req: Request, res: Response) => {
    const course = await coursesService.getCourse(new ObjectId (req.params.courseId))
    if(!course){
        throw new ApiError('course not found ', 404)
    }
    res.status(200).json({
        status: SUCCESS,
        data: {course}
    })
})


const updateCourse = asyncWrapper (async(req: Request, res: Response) => {
    const course = await coursesService.getCourse(new ObjectId (req.params.courseId))
    if(!course){
        throw new ApiError('course not found ', 404)
    }
    await coursesService.updateCourse(req.body, course)
    res.status(200).json({
        status: SUCCESS,
        data: {course}
    })
})



const deleteCourse = asyncWrapper (async(req: Request, res: Response, next: NextFunction) => {
    const course = await coursesService.getCourse(new ObjectId(req.params.courseId))
    if(!course){
        throw new ApiError('course not found ', 404)
    }
    await coursesService.deleteCourse(new ObjectId(req.params.courseId))
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