const mongoose= require("mongoose");
const OTPSchema=new mongoose.Schema({
    OTP:{
        type:String,
        require:true
    },
    Email:{
        type:String,
        require:true
    },
    createdAt:{
        type:Date,
        Default:Date.now,
        expires:60
    }
});


module.exports= mongoose.model("OTP",OTPSchema);