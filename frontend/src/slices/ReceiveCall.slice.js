import { createSlice } from "@reduxjs/toolkit";


const initialState={
    CallerData:{}
}


const ReceivceSlice=createSlice({
    name:"RecevingCall",
    initialState,
    reducers :{
        Caller: (state,action)=>{
          state.CallerData=action.payload;
        }

    }
})

export const {Caller}= ReceivceSlice.actions;
export default ReceivceSlice.reducer;