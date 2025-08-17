const mongoose= require("mongoose");
const bcrypt=require("bcrypt");
const Userschema= new mongoose.Schema({
    Username:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    },
    gender:{
      type:String,
      default:"Male",
      enum:["Male","Female"]
    },

    age:{
      type:String,
      default:20,
    },

    lookingFor:{
      type:String,
    },

    location:{
      type:String
    },

    about:{
      type:String
    },
    hobbies:{
      type:[String]
    }, 
    topics:{
      type:[String]
    },
    ProprofilePic:{
      type:String,
    },

    url:{
      type:String
    },
    myContactsRequestSend:[
      {
      User:{
      type: mongoose.Schema.Types.ObjectId,
      ref:"User"
    },
    Status:{
      type:String,
     default:"Pending",
     enum:["Pending","Accepted","Rejected"]
    }
  }
  ],
    RequestReceived:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
    }],
    myContacts:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
    }]

},{timestamps:true})

Userschema.pre("save", async function (next) {
  if (this.isModified("Password")) {
    this.Password = await bcrypt.hash(this.Password, 10);
  }
  next();
});


module.exports=mongoose.model("User",Userschema)