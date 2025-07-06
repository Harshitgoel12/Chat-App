const {app,server}= require("./utils/index.js")
const ConnectDB= require("./config/Connection.js");
app.get('/',(req,res)=>{
    res.send("Hello ji kaise ho sare")
})
ConnectDB().then((res)=>{
    console.log("mongodb connected successfully")
server.listen(3000,()=>{
    console.log("server is listen at port 30000")
})
}).catch((err)=>{
    console.log("something went wrong while connecting with the db")
})