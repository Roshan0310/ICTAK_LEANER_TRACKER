const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    courseCode:{
        type:String,
        required:[true,"Please enter the course code"]
    },
    courseName:{
        type:String,
        required:[true,"Please enter the course name"]
    }
});

module.exports = mongoose.model("Course",courseSchema);