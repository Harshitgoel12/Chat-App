const nodemailer = require("nodemailer");
require("dotenv").config();
  const sendMail=(email,subject,otp,message)=>{

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user:process.env.SENDER_EMAIL,
    pass: process.env.PASSWORD,
  },
});


const mailOptions = {
  from:process.env.SENDER_EMAIL,
  to: email,
  subject: subject,
  text: message + otp,
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error("Error sending email: ", error);
  } else {
    console.log("Email sent: ",info, info.response);
  }
})

    
 }


  module.exports=sendMail;