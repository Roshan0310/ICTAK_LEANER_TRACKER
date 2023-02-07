const mongoose = require("mongoose");

const batchSchema = new mongoose.Schema({
    batchCode:{
        type:String,
        required:[true,"Please enter the batch code"]
    },
    batchName:{
        type:String,
        required:[true,"Please enter the batch name"]
    }
});

module.exports = mongoose.model("Batch",batchSchema);
