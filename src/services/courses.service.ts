import ApiError from '../errors/api.error'
import { ICourse, Course, CreateCourseData, UpdateCourseData } from '../models/course.model'
import { Types } from 'mongoose'


export const getAllCourses = async(limit: number, skip: number) => {
    const courses = await Course.find({}, {"__v": false}).limit(limit).skip(skip)
    return courses
}

export const addNewCourse = async(data: CreateCourseData) => {
    const course = await Course.findOne({title: data.title})
    if(course){
        throw new ApiError('course already exists', 409, course)
    }
    const newCourse = new Course(data)
    await newCourse.save()
    return newCourse
}

export const getCourse  = async(id: Types.ObjectId) :Promise<ICourse | null>  => {
    const course = await Course.findById(id)
    return course 
}

export const updateCourse  = async(data: UpdateCourseData, course: ICourse) => {
    course.title = data.title ?? course.title // nullish operator
    course.price = data.price ?? course.price
    await course.save()
    return course
}


export const deleteCourse  = async(id: Types.ObjectId) => {
    return await Course.deleteOne({_id: id})
}