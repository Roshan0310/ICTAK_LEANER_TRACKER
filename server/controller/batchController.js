const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncErrors");
const Batch = require("../model/batchModel");

//Create new batch --Admin
exports.createBatch = catchAsyncError(async(req,res,next)=>{
    const batch = await Batch.create(req.body);

    res.status(201).json({
        success: true,
        batch
      });
});

//Get all batches detials --Admin
exports.getAllBatches = catchAsyncError(async(req,res,next)=>{
    const batches = await Batch.find();

    // res.status(200).json({
    //     success: true,
    //     batches
    //   });
    res.send(batches).status(200);
});

//Get single batch detial --Admin
exports.getSingleBatch = catchAsyncError(async(req,res,next)=>{
    const batch = await Batch.findById(req.params.id);

    if(!batch){
        return next(new ErrorHandler("Batch not found !", 404))
    }

    res.status(200).json({
        success: true,
        batch
      });
});

//Update batches - Admin
exports.updateBatches = catchAsyncError(async(req,res,next)=>{
    let batch = await Batch.findById(req.params.id);

    if(!batch){
        return next(new ErrorHandler("Batch not found !", 404))
    }

    batch = await Batch.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });

      res.status(200).json({
        success: true,
        batch
      });

});


//Delete Batches --Admin

exports.deleteBatches = catchAsyncError(async(req,res,next)=>{
    let batch = await Batch.findById(req.params.id);

    if(!batch){
        return next(new ErrorHandler("Batch not found !", 404))
    }

    await batch.remove();

    res.status(200).json({
        success: true,
        message: "Batch Deleted Successfully",
      });
})