import { createSlice } from "@reduxjs/toolkit";

const initialState={
      data:null
}

const OnlineUser= createSlice({
    name:"Online-user",
    initialState,
    reducers:{
        setOnlineUser:(state,action)=>{
          state.data=action.payload
        }
    }
})



export const {setOnlineUser}= OnlineUser.actions;
export default OnlineUser.reducer;