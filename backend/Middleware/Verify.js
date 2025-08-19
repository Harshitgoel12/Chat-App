const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
require("dotenv").config();

const verify = async (req, res, next) => {
  try {
    const token = req.cookies?.token || req.body?.token ;
        console.log("token is ",token)
    if (!token) {
      return res.status(401).json({ success: false, message: "Token is not present" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedToken || !decodedToken.data?.id) {
      return res.status(401).json({ success: false, message: "Invalid Token" });
    }

    const user = await User.findById(decodedToken.data.id);

    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    req.userData = user; 
    next();

  } catch (err) {
    console.log("Error in verify middleware:", err.message);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = verify;
