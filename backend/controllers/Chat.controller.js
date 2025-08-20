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





const UploadFile = async (req, res) => {
  try {
    const Id = req.userData.id;
    const { id } = req.params;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ success: false, message: "File is not present" });
    }
    if (!id) {
      return res.status(400).json({ success: false, message: "Invalid User" });
    }

    // Upload buffer directly to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: "auto" },
        (error, uploaded) => {
          if (error) reject(error);
          else resolve(uploaded);
        }
      );
      stream.end(file.buffer);
    });
console.log(stream);
    const data = await Message.create({
      senderId: Id,
      receiverId: id,
      file: result.secure_url,
      fileType: result.format,
    });

    let conversation = await Conversation.findOne({ participants: { $all: [Id, id] } });
    if (!conversation) {
      conversation = new Conversation({ participants: [Id, id], ConversationData: [] });
      await conversation.save();
    }

    conversation.ConversationData.push(data);
    await conversation.save();
    await conversation.populate("ConversationData");

    return res.status(200).json({
      success: true,
      message: "File sent successfully",
      data,
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};


module.exports={SendMessage,GetChat,UploadFile};

