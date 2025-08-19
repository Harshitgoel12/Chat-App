const Conversation=require("../models/Conversation.js");
const Message=require("../models/message.model.js");
const cloudinary=require("../Middleware/CloudConfig.js")

const  SendMessage=async(req,res)=>{
    try {
      const Id= req.userData.id;   
      const {id}=req.params;
      const {message}=req.body;
      
   if(!id){
    return res.status(401).json({success:false,message:"Please select the user for chat"});
   }
     const resp= await Message.create({senderId:Id,receiverId:id,message});

     let existingConversation = await Conversation.findOne({
  participants: { $all: [Id,id] }
});
if(!existingConversation){
      existingConversation = new Conversation({
      participants: [Id,id],
      ConversationData: []
    });

    await existingConversation.save();
}
existingConversation.ConversationData.push(resp);
await existingConversation.save();

 existingConversation=await existingConversation.populate("ConversationData")

return res.status(200).json({success:true,message:"Message send Successfully",data:resp})



    } catch (error) {
        console.log("something went wrong while sending the message",error.message);
        return res.status(500).json({success:false,message:"Internal Server Error"});
    }
}



const GetChat= async(req,res)=>{
try {
     const Id=req.userData;
     const {id}=req.params;

      let existingConversation = await Conversation.findOne({
  participants: { $all: [Id,id] }
});
if(!existingConversation){
    return res.status(401).json({success:false,message:"Invalid User"});
}

 existingConversation= await existingConversation.populate("ConversationData");
 return res.status(200).json({success:true,message:"User Messages is fetched Successfully",data:existingConversation.ConversationData});

} catch (error) {
    console.log("something went wrong while fetching user data",error.message);
    return res.status(500).json({success:false,message:"Internal server error"});
}
}






const UploadFile=async(req,res)=>{
    try {
        const Id=req.userData.id;
        const {id}=req.params;
        const file=req.file;
      
        if(!file){
            return res.status(401).json({success:false,message:"file is not present"});
        }
        if(!id){
            return res.status(401).json({success:false,message:"Invalid User"});
        }
        const resp=await cloudinary.uploader.upload(file.path);
       

        const data=await Message.create({
            senderId:Id,receiverId:id,file:resp.secure_url,fileType:resp.format
        })

  let existparticipants= await Conversation.findOne({participants:{$all:[Id,id]}});
  if(!existparticipants){
      existingConversation = new Conversation({
      participants: [Id,id],
      ConversationData: []
    });

    await existingConversation.save();
  }

  existparticipants.ConversationData.push(data);
  await existparticipants.save();

  existparticipants=await existparticipants.populate("ConversationData");

        return res.status(200).json({success:true,message:"file send successfully",data})

    } catch (error) {
        console.log("something went wrong while uploading file ",error.message);
        return res.status(500).json({success:false,message:"Internal Server Error"});
    }
}


module.exports={SendMessage,GetChat,UploadFile};

