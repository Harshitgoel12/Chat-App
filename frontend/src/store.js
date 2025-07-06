import { configureStore } from "@reduxjs/toolkit";
import user from "./slices/User.slice"


const store=configureStore({
    reducer:{
       user,
    }
})

export default store;