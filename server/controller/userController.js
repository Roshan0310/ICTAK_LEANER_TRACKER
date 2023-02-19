const User = require("../model/userModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncErrors");
const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.getAllUsers = catchAsyncError(async (req, res) => {
  const users = await User.find();

  // res.status(200).json({
  //     success: true,
  //     users,
  //   });
  res.send(users).status(200);
});

//user registration
exports.createUSers = catchAsyncError(async (req, res) => {
  //    const user = await User.create(req.body);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password:req.body.password,
    role: req.body.role,
    
  });
  user.save();
  res.status(200).json({
    success: true,
    user,
  });
  console.log(user);
});

//user Login

exports.loginUser = catchAsyncError(async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  let result = User.find({ email: email }, (err, data) => {
    if (data.length > 0) {
      const passwordValidator = bycrypt.compareSync(password, data[0].password);
      if (passwordValidator) {
        jwt.sign(
          { email: email, id: data[0]._id },
          "LearnerToken",
          { expiresIn: "1d" },
          (err, token) => {
            if (err) {
              res.json({ status: "failed", error: err });
            } else {
              res.json({ status: "success", data: data, token: token });
            }
          }
        );
      } else {
        res.json({ status: "failed", data: "invalid password" });
      }
    } else {
      res.json({ status: "failed", data: "invalid email" });
    }
  });
});

//Update User  --Admin
exports.updateUser = catchAsyncError(async(req,res,next)=>{
    let id = req.params.id;
   
    
    let user = await User.findByIdAndUpdate({"_id":id},req.body)

    if(!id){
        return next(new ErrorHandler("User not found !", 404));
    }

    res.status(200).json({
        success:true,
        user
    })
})


exports.deleteUser = catchAsyncError(async(req,res,next)=>{
    const user  = await User.findById(req.params.id);

     if(!user){
        return next(new ErrorHandler("User not found !", 404));
    }
    await user.remove();

    res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });

})
