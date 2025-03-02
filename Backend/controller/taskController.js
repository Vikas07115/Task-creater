import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/taskSchema.js";

export const createTask = catchAsyncErrors(async(req,res,next)=>{});
export const deleteTask = catchAsyncErrors(async(req,res,next)=>{});
export const updateTask = catchAsyncErrors(async(req,res,next)=>{});
export const getMyTask = catchAsyncErrors(async(req,res,next)=>{});
export const getSingleTask = catchAsyncErrors(async(req,res,next)=>{});