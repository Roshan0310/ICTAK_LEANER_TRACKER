const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncErrors");
const Learner = require("../model/learnerModel");
const ApiFeatures = require("../utils/apiFeatures");
const verifyToken = require("../utils/verifyToken");
const jwt = require("jsonwebtoken");


// Adding single learner -- Admin and Training Head
exports.createLearner = catchAsyncError(async (req, res, next) => {
  // const learner = await Learner.create(req.body);
  //   console.log("runned");
  // res.status(201).json({
  //   success: true,
  //   learner,
  // });
  jwt.verify(req.body.token,"LearnerToken",(err,decoded)=>{
      if(decoded && decoded.email){
          let data = new Learner({
            learnerId:req.body.learnerId,
            learnerName:req.body.learnerName,
            courseName:req.body.courseName,
            project:req.body.project,
            batch:req.body.batch,
            courseStatus:req.body.courseStatus,
            placementStatus:req.body.placementStatus,
          })
          data.save()
          res.json({"status":"success",data})
      }else{
        res.json({"status":"Failed... Unuthorized User...!"})
      }
      
  })
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



exports.csvUpload = catchAsyncError (async (req,res,next)=> {
  try {
      //console.log('req.body='+req.body);
      //const jData = jsonObj(req.body);
      console.log('req.body.length=' + req.body.length);
      var learnersSuccess = [];
      var learnersError = [];
var isOk=true;
      for (var i = 0; i < req.body.length; i++) {
          let result = Learner.find({ learnerId: req.body[i]['learnerId'] }, (err, data) => {
              if (data.length > 0) {
                  isOk=false;
                  return res.status(200).json({ status: 'Failed', "Message": "LearnerId duplication found, Upload failed!"});
              }
          })  
      }

  
      const dataToSave = await Learner.insertMany(req.body);
          res.status(200).json({ status: 'OK', "Message": "Records Inserted Successfully!" });
  }
  catch (error) {
      res.status(500).json({ status: 'Error', message: error.message });
  }
} );
