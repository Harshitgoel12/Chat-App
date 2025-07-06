let Connectionmap={};

const UserConnected=(SocketId,userId)=>{
    Connectionmap[userId]=SocketId
}

const  UserDisconnected=(userId)=>{
    delete Connectionmap[userId];
}


module.exports={UserConnected,UserDisconnected};