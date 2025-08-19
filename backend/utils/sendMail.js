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
  text: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>OTP Verification</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #f9fafb;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 500px;
      margin: 30px auto;
      background: #ffffff;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
      padding: 30px;
      text-align: center;
    }
    .header {
      font-size: 22px;
      font-weight: bold;
      color: #3B82F6;
      margin-bottom: 20px;
    }
    .otp-box {
      background: #f3f4f6;
      padding: 15px 20px;
      font-size: 24px;
      font-weight: bold;
      letter-spacing: 6px;
      border-radius: 8px;
      display: inline-block;
      color: #111827;
      margin: 20px 0;
    }
    .message {
      font-size: 16px;
      color: #374151;
      margin-bottom: 25px;
    }
    .footer {
      font-size: 14px;
      color: #6b7280;
      margin-top: 30px;
    }
    .brand {
      font-weight: bold;
      color: #3B82F6;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">🔒 Verify Your Email</div>
    <p class="message">
      Use the following One-Time Password (OTP) to verify your email for <span class="brand">ChatApp</span>.
      This code is valid for the next <b>10 minutes</b>.
    </p>

    <div class="otp-box">${otp}</div>

    <p class="message">If you did not request this, you can safely ignore this email.</p>

    <div class="footer">
      Thanks,<br/>The <span class="brand">ChatApp</span> Team
    </div>
  </div>
</body>
</html>
`
  
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