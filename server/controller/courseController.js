const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncErrors");
const Course = require("../model/courseModel");

//create a course --Admin
exports.createCourse = catchAsyncError(async (req, res, next) => {
  const course = await Course.create(req.body);

  res.status(201).json({
    success: true,
    course,
  });
});

//Get all courses --Admin
exports.getAllCourses = catchAsyncError(async (req, res, next) => {
  const courses = await Course.find();

  res.status(200).json({
    success: true,
    courses,
  });
});

//Get single Course detials --Admin
exports.getSingleCourse = catchAsyncError(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return next(new ErrorHandler("Course not found !", 404));
  }

  res.status(200).json({
    success: true,
    course,
  });
});

//Update Courses --Admin
exports.updateCourses = catchAsyncError(async (req, res, next) => {
  let course = await Course.findById(req.params.id);

  if (!course) {
    return next(new ErrorHandler("Course not found !", 404));
  }

  course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    course,
  });
});

//Delete courses --Admin
exports.deleteCourses = catchAsyncError(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return next(new ErrorHandler("Course not found !", 404));
  }

  await course.remove();

  res.status(200).json({
    success: true,
    message: "Course Deleted Successfully",
  });
});
