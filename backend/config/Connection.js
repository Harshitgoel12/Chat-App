const mongoose=require("mongoose");
require("dotenv").config({})

const ConnectDB=async()=>{

   try {
    const response= await mongoose.connect(process.env.MONGODB_URI);
    
   } catch (error) {
    console.log("kuch error aa rha hai ",error.message);
   }
}

module.exports=ConnectDB;