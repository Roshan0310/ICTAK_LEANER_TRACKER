const mongoose = require("mongoose");
const bycrypt = require("bcrypt");


const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        default:"user"
    }
});

userSchema.pre("save",async function(next){

    this.password = await bycrypt.hashSync(this.password,10)
})
const User = mongoose.model("User",userSchema);

module.exports = User;