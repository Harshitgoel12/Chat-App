import { configureStore } from "@reduxjs/toolkit";
import user from "./slices/User.slice"
import CallerDetails from "./slices/ReceiveCall.slice"
import OnlineUserStore from "./slices/OnlineUser"


const store=configureStore({
    reducer:{
       user,
       CallerDetails,
       OnlineUserStore
    }
})

export default store;