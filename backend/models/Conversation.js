const mongoose =require("mongoose");
const ConversationSchema= new mongoose.Schema({
    participants:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        }
    ],
    ConversationData:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Message",
    }]
})

module.exports = mongoose.model("Conversation",ConversationSchema);