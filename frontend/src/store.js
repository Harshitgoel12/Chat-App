import { configureStore } from "@reduxjs/toolkit";
import user from "./slices/User.slice"
import CallerDetails from "./slices/ReceiveCall.slice"


const store=configureStore({
    reducer:{
       user,
       CallerDetails,
    }
})

export default store;