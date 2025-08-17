const { default: mongoose } = require("mongoose");
const OTP=require("../models/OTP.model");
const User=require("../models/user.model.js")
const sendMail=require("../utils/sendMail")
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

const OTPSend=async(req,res)=>{
    try {
       const {Email}=req.body;
      console.log("email aa gya",Email)
       if(!Email){
        return res.status(401).json({success:false,message:"Email is required"});
       } 
    console.log("ab user check krte hai",User)
         const response= await User.findOne({Email});
       
         if(response){
            return res.status(401).json({success:false,message:"User with same email already exist"});
         }
         const otp= Math.floor(1000 + Math.random() * 9000);
        
         const result = await sendMail(Email,"Verify OTP",otp,"please verify your self");
           const ans=await OTP.create({OTP:otp,Email});
         return res.status(200).json({success:true,message:"OTP send Successfully"});

    } catch (error) {
        return res.status(500).json({success:false,message:"Internal Server Error"});
    }
}


const VerifyOTP= async(req,res)=>{
    try {
        const {otp,Email}=req.body;
        
         const resp=await OTP.findOne({Email});
        
         if(resp.OTP!=otp){
            return res.status(401).json({success:false,message:"Invalid OTP"});
         }
         
         return res.status(200).json({success:true,message:"OTP Verified Successfully"})
    } catch (error) {
        console.log("something went wrong while verifing the otp");
        return res.status(500).json({success:false,message:"Internal server error"});
    }
}

const signup=async(req,res)=>{
    try {
      const{Username,Email,Password,url}  =req.body;
      console.log(url);
      console.log(Username,Email,Password);
      if(!Username||!Email||!Password){
        return res.status(401).json({success:false,message:"All the fields  are required"});
      }
      const resp=await User.findOne({Email});
      if(resp){
        return res.status(401).json({success:false,message:"User is Already Registered"});
      }

     const data= await User.create({
        Username,Email,Password,url
      })
console.log("sb theek hia ",data)
      return res.status(200).json({success:true,message:"User Registered Successfully"});

    } catch (error) {
        console.log("something went wrong while registering the user",error.message);
        return res.status(500).json({success:false,message:"Internal Server Error"});
    }
}


const Login= async(req,res)=>{
    try {
        const {Email,Password}=req.body;
      
        if(!Email||!Password){
            return res.status(401).json({success:false,message:"All field are required"});
        }
        console.log("yha tk bhi theek hai")
        const response=await User.findOne({Email});
        console.log("aa gye hmm aa gye")
        if(!response){
            return res.status(401).json({success:false,message:"User is not Registered"});
        }
  
        const isSame=await bcrypt.compare(Password,response.Password);

        if(!isSame){
           return res.status(401).json({success:false,message:"Incurrect Password"});
        }
        
const data={
    id:response._id,
    Username:response.Username,
}
        const token= jwt.sign({data},"asdfajkshdgkajshdgkjxcmvbsdgsaf",{
            expiresIn:"2d",
        })


        await response.populate("RequestSend RequestReceived myContacts")

        return res.cookie("token",token, {
        httpOnly: true,
        secure: false, 
        sameSite: "lax",
        maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days
      }).json({success:true,message:"User Login Successfully",data:response});

    } catch (error) {
        console.log("something went wrong while Login User",error.message);
        return res.status(500).json({success:false,message:"Internal Server Error"});
    }
}



const Search= async(req,res)=>{
    try {
          const user=req.userData.id;
          const userdata = await User.findById(user); 
          console.log(userdata);
const { RequestReceived = [], RequestSend = [], myContacts=[] } = userdata;

const excludedIds = [...RequestReceived, ...RequestSend,req.userData.id,...myContacts].map(id => new mongoose.Types.ObjectId(id));

const resp = await User.find({
  _id: { $nin: excludedIds }
});
         const val=resp.filter((ele,idx)=>{
            return ele._id!=user
         })
           
        return res.status(200).json({success:true,message:"UserFetched Successfully",data:val});
    } catch (error) {
        console.log("something went wrong while searching user",error.message);
        return res.status(500).json({success:false,message:"Internal Server Error"});
    }
}





const SendRequest = async (req, res) => {
  try {
    const userId = req.userData.id;
    const { id } = req.params;

    if (userId === id) {
      return res.status(401).json({ success: false, message: "Invalid User" });
    }

    if (!id) {
      return res.status(401).json({ success: false, message: "Please select the User" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }


    const alreadySent = user.RequestSend.some(
      (req) => req.User.toString() === id && req.Status === "Pending"
    );
    if (alreadySent) {
      return res.status(401).json({ success: false, message: "Request is already being sent" });
    }


    if (user.RequestReceived.includes(id)) {
      return res.status(401).json({ success: false, message: "You have already received a request from this user" });
    }


    user.RequestSend.push({ User: id, Status: "Pending" });
    await user.save();

  
    const receiver = await User.findById(id);
    if (!receiver) {
      return res.status(404).json({ success: false, message: "Receiver not found" });
    }
    receiver.RequestReceived.push(userId);
    await receiver.save();

    const populatedSender = await User.findById(userId).populate("RequestSend.User  myContacts RequestReceived");

    return res.status(200).json({
      success: true,
      message: "Request sent successfully",
      data: populatedSender
    });

  } catch (error) {
    console.error("Something went wrong while sending the request:", error.message);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};



const RequestReceived = async(req,res)=>{
    try {
        const userId= req.userData.id;
       const user= await User.findById({userId}).populate("RequestReceived   myContacts");
       if(!user){
        return res.status(401).json({success:false,message:"User is not Registered"});
       }

       return res.status(200).json({success:true,message:"User Request data is fetched successfully",data:user.RequestReceived})

    } catch (error) {
        console.log("something went wrong while sending the request",error.message);
        return res.status(500).json({success:false,message:"Internal Server Error"});
    }
}



 const AcceptRequest = async (req, res) => {
  try {
    const userId = req.userData.id;
    const { id } = req.params;

    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    user.RequestReceived = user.RequestReceived.filter(
      (ele) => ele.toString() !== id
    );
    user.myContacts.push(id);
    await user.save();

 
    const sender = await User.findById(id);
    if (!sender) {
      return res.status(404).json({ success: false, message: "Sender not found" });
    }

    sender.RequestSend = sender.RequestSend.map((request) => {
      if (request.User.toString() === userId) {
        return { ...request.toObject(), Status: "Accepted" };
      }
      return request;
    });

    sender.myContacts.push(userId);
    await sender.save();

    user=await user.populate("RequestReceived RequestSend.User myContacts")

    return res.status(200).json({
      success: true,
      message: "Request Accepted Successfully",
      data: user,
    });

  } catch (error) {
    console.log("Something went wrong while accepting the request:", error.message);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


 
const RejectRequest = async (req, res) => {
  try {
    const userId = req.userData.id;
    const { id } = req.params;

    // Find sender user (who sent the request)
    const sender = await User.findById(id);
    if (!sender) {
      return res.status(401).json({ success: false, message: "Invalid sender details" });
    }

    sender.RequestSend = sender.RequestSend.map((req) => {
      if (req.User.toString() === userId) {
        return { ...req.toObject(), Status: "Rejected" };
      }
      return req;
    });

    await sender.save();

    
    const currentUser = await User.findById(userId);
    if (!currentUser) {
      return res.status(401).json({ success: false, message: "Invalid current user" });
    }

   
    currentUser.RequestReceived = currentUser.RequestReceived.filter(
      (ele) => ele.toString() !== id
    );

    await currentUser.save();

    await currentUser.populate("RequestSend RequestReceived  myContacts")

    return res.status(200).json({
      success: true,
      message: "Request Rejected Successfully",
      data: currentUser,
    });

  } catch (error) {
    console.log("Something went wrong while rejecting the request:", error.message);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};




 const ProfileData=async(req,res)=>{
try {
  const {id}=req.params;
  if(!id){
    return res.status(401).json({success:false,message:"Invalid User"});
  }
  const user=await User.findById(id).populate("RequestSend RequestReceived");
  return res.status(200).json({success:true,message:"Profile Data fetch Successfully",data:user})
} catch (error) {
  console.log("something went wrong while fetching profile data",error.message);
  return res.status(500).json({success:false,message:"Internal server error"});
}
 }


 
 const SaveProfile= async(req,res)=>{
try {
  const {id}=req.params;
  const {Username,Email,gender,age,lookingFor,location,about,hobbies,topics,ProprofilePic,url}=req.body;
  const user=await User.findByIdAndUpdate(id,{$set:{Username,Email,gender,age,lookingFor,location,about,hobbies,topics,ProprofilePic,url}});
     user.populate("RequestSend")
  return res.status(200).json({success:true,message:"User Profile Saved Successfully",data:user});
} catch (error) {
  console.log("something went wrong while saving profile",error.message);
  return res.status(500).json({success:false,message:"Internal Server Error"});
}
 }






 const Logout=async(req,res)=>{
try {
  return res.clearCookie("token",{httpOnly:true}).status(200).json({success:true,message:"User Logout Successfully"})
} catch (error) {
  console.log("something went wrong while Logout the user",error.message);
  return res.status(500).json({success:false,message:"Internal Server Error"})
}
 }





 const IncommingRequest = async(req,res)=>{
  try {
    const userId=req.userData.id;
    const userdata= await User.findById(userId).populate("RequestReceived");
    return res.status(200).json({success:true,message:"IncommingRequest fetched successfully", request:userdata.RequestReceived})
  } catch (error) {
    console.log("something went wrong while fetching incomming request",error.message);
  }
 }




 const SendRequestData  = async(req,res)=>{
  try {
      const userId=req.userData.id;
    const userdata= await User.findById(userId).populate("RequestSend");
    return res.status(200).json({success:true,message:"IncommingRequest fetched successfully", request:userdata.RequestSend})
  } catch (error) {
    console.log("something went wrong ",error.message);
    return res.status(500).json({success:true,message:"Internal Server Error"});
  }
 }


 const MyContacts= async(req,res)=>{
  try {
      const userId=req.userData.id;
    const userdata= await User.findById(userId).populate("myContacts");
    return res.status(200).json({success:true,message:"IncommingRequest fetched successfully", request:userdata.myContacts})
  } catch (error) {
    console.log("something went wrong ",error.message);
    return res.status(500).json({success:true,message:"Internal Server Error"});
  }
 }



module.exports  ={
    OTPSend,
    VerifyOTP,
    signup,
    Login,
    Search,
    SendRequest,
    RequestReceived,
    AcceptRequest,
    RejectRequest,
    ProfileData,
    SaveProfile,
    Logout,
    IncommingRequest,
    SendRequestData,
    MyContacts
}