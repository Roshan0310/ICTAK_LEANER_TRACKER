const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncErrors");
const Project = require("../model/projectModel");


//Create a course --Admin 
exports.createProject = catchAsyncError(async(req,res,next)=>{
    const project = await Project.create(req.body);

    res.status(201).json({
        success: true,
        project,
      });
});

//Get all projects detials --Admin
exports.getAllProjects = catchAsyncError(async(req,res,next)=>{
    const projects = await Project.find();

    // res.status(200).json({
    //     success: true,
    //     projects,
    //   });
    res.send(projects).status(200);
});

//Get single project Detials Admin
exports.getSingleProject = catchAsyncError(async(req,res,next)=>{
    const project = await Project.findById(req.params.id);

    if (!project) {
        return next(new ErrorHandler("Project not found !", 404));
      }

    res.status(200).json({
        success: true,
        project,
      });
});

//Update project Detials
exports.updateProjects = catchAsyncError(async(req,res,next)=>{
    let project = await Project.findById(req.params.id);

    if (!project) {
        return next(new ErrorHandler("Project not found !", 404));
      }

      project = await Project.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });

      res.status(200).json({
        success: true,
        project,
      });
});

//Delete a Project --Admin
exports.deleteProject = catchAsyncError(async(req,res,next)=>{
    const project = await Project.findById(req.params.id);

    if (!project) {
        return next(new ErrorHandler("Project not found !", 404));
      }

      await project.remove();

    res.status(200).json({
        success: true,
        project,
      });
})