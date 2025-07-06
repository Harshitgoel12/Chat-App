const mongoose=require("mongoose");

const ConnectDB=async()=>{

   try {
    const response= await mongoose.connect("mongodb://127.0.0.1:27017/ChatApp");
    
   } catch (error) {
    console.log("kuch error aa rha hai ",error.message);
   }
}

module.exports=ConnectDB;