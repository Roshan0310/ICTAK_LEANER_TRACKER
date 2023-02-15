const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncErrors");
const Learner = require("../model/learnerModel");
const ApiFeatures = require("../utils/apiFeatures");

// Adding single learner -- Admin and Training Head
exports.createLearner = catchAsyncError(async (req, res, next) => {
  const learner = await Learner.create(req.body);

  res.status(201).json({
    success: true,
    learner,
  });
});



//Get all Learners detials
exports.getAllLearners = catchAsyncError(async (req, res) => {
  const resultPerPage = 10;

  const apiFeatures = new ApiFeatures(Learner.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);

  const learners = await apiFeatures.query;

  // res.status(200).json({
  //   success: true,
  //   learners,
  // });
  res.send(learners).status(200)
});

//Get single Learner detials
exports.getSingleLearnerDetials = catchAsyncError(async (req, res, next) => {
  const learner = await Learner.findById(req.params.id);

  if (!learner) {
    return next(new ErrorHandler("Learner not found !", 404));
  }

  res.status(200).json({
    success: true,
    learner,
  });
});

//Update Learner Detials --Admin and Training Head
exports.updateLearner = catchAsyncError(async (req, res, next) => {
  let learner = await Learner.findById(req.params.id);

  if (!learner) {
    return next(new ErrorHandler("Learner not found !", 404));
  }

  learner = await Learner.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    learner,
  });
});

// placment status update --Placement Officer
exports.updatePlacementStatus = catchAsyncError(async (req, res, next) => {
  const learner = await Learner.findById(req.params.id);

  if (!learner) {
    return next(new ErrorHandler("Learner not found !", 404));
  }

  learner = await Learner.findByIdAndUpdate(
    req.params.id,
    req.params.placementStatus,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
});

//Delete Learners - Admin and Training Head
exports.deleteLearner = catchAsyncError(async (req, res, next) => {
  const learner = await Learner.findById(req.params.id);

  if (!learner) {
    return next(new ErrorHandler("Learner not found !", 404));
  }

  await learner.remove();

  res.status(200).json({
    success: true,
    message: "Learner Deleted Successfully",
  });
});
