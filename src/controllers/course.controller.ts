import { Request, response, Response } from "express";
import { validationResult } from "express-validator";
import { Course } from '../models/course.model'

const getAllCourses = async(req: Request, res: Response) => {
    try{
        const courses = await Course.find()
        res.status(200).json(courses)
    }catch(err){
        res.status(500).json({ message: 'Error getting all courses: ', err });
    }
}

const addNewCourse = async(req: Request, res: Response) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json(errors.array())
        return
    }
    try{
        const course = await Course.findOne({title: req.body.title})
        if(course){
            res.status(409).json({
                msg: 'this course alreay exists'
            })
            return
        }else{
            const newCourse = new Course(req.body)
            await newCourse.save()
            res.status(201).json(newCourse)
        }
    }catch(err){
        res.status(500).json({ message: 'Error adding new course: ', err });
    }
}

const getCourse = async(req: Request, res: Response) => {
    try{
        const course = await Course.findById(req.params.courseId)
        if(!course){
            res.status(404).json({
                msg: 'course not found'
            })
            return
        }
        res.status(200).json(course)
    }catch(err){
        res.status(500).json({ message: 'Error getting course: ', err });
    }
}

const updateCourse = async(req: Request, res: Response) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json(errors.array())
        return
    }
    try{
        const course = await Course.findById(req.params.courseId)
        if(!course){
            res.status(404).json({
                msg: 'course not found'
            })
            return
        }
        await Course.updateOne({_id: req.params.courseId}, {...req.body})
        res.status(200).json({
            msg: 'Course is updated successfully'
        })
    }catch(err){
        res.status(500).json({ message: 'Error updating course: ', err });
    }
}

const deleteCourse = async(req: Request, res: Response) => {
    try{
        const course = await Course.findById(req.params.courseId)
        if(!course){
            res.status(404).json({
                msg: 'course not found'
            })
            return
        }
        await Course.deleteOne({_id: req.params.courseId})
        res.status(200).json({
            msg: 'Course is deleted successfully',
        });
    }catch(err){
        res.status(500).json({ message: 'Error deleting course: ', err });
    }
}

export { 
    getAllCourses,
    addNewCourse,
    getCourse,
    updateCourse, 
    deleteCourse
}