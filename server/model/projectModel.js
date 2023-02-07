const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    projectCode:{
        type:String,
        required:[true,"Please enter the project code"]
    },
    projectName:{
        type:String,
        required:[true,"Please enter the project name"]
    }
});

module.exports = mongoose.model("Project",projectSchema);