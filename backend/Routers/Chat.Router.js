const express=require("express");
const verify = require("../Middleware/Verify");
const ChatController=require("../controllers/Chat.controller")
const upload=require("../Middleware/multer")
const router=express.Router();

router.route("/Send-Message/:id").post(verify,ChatController.SendMessage)
router.route("/Fetch-Chats/:id").get(verify,ChatController.GetChat)
router.route("/Send-File/:id").post(verify,upload.single("file"),ChatController.UploadFile);
module.exports=router;