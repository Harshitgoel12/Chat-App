const nodemailer = require("nodemailer");
  const sendMail=(email,subject,otp,message)=>{

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "hg227575@gmail.com",
    pass: "jlaeuyxwgcilbayf",
  },
});


const mailOptions = {
  from: "hg227575@gmail.com",
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