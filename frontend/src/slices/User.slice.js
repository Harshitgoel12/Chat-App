import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userData: localStorage.getItem("Userdata")?JSON.parse(localStorage.getItem("Userdata")):null,
  Receiver:null
};

const UserData=createSlice({
    name:"UserData",
    initialState,
    reducers:{
        User:(state,action)=>{
            state.userData=action.payload;
        },
        SelectedUser:(state,action)=>{
            state.Receiver=action.payload;
        }
    }
})


export const {User,SelectedUser} =UserData.actions;
export default UserData.reducer;