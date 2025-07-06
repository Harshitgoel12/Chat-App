const express = require('express');      
const router = express.Router();   
const Controller=require("../controllers/User.controller")
const verify=require("../Middleware/Verify")

router.route("/send-otp").post(Controller.OTPSend);
router.route("/opt-verification").post(Controller.VerifyOTP);
router.route("/signup").post(Controller.signup);
router.route("/Login").post(Controller.Login)
router.route("/Search").post(verify,Controller.Search);
router.route("/SendFriendRequest/:id").post(verify,Controller.SendRequest);

router.route("/AcceptRequest/:id").post(verify,Controller.AcceptRequest);
router.route("/RejectRequest/:id").post(verify,Controller.RejectRequest)

router.route("/Profile/:id").get(verify,Controller.ProfileData);
router.route("/SaveProfile/:id").put(verify,Controller.SaveProfile)
router.route("/Logout").get(verify,Controller.Logout);

module.exports=router;