
import { Outlet } from 'react-router-dom'
import './App.css';
import Signup from './pages/Signup'
import Header from './pages/Header';
import Image from "./chat.png"
import socket from './socket';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReceivceCall from './pages/ReceivceCall';
import { Caller } from './slices/ReceiveCall.slice';
import Footer from './pages/Footer';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch= useDispatch();
const myuser = useSelector((state) => state.user.userData);
  const myID = myuser?._id;
     const [ReceivingCall,setReceivingCall]=useState(false);
    const[AcceptCall,setAcceptCall]=useState(false);
   useEffect(() => {
      if (myID) {
        socket.emit('add-user', myID);
      }
    }, [myID]);

 
useEffect(()=>{
 socket.on("CallToUser",(data)=>{
    setReceivingCall(true);
    dispatch(Caller({signal:data.signal,callerId:data.myID,userName:data.userName,ProfilePic:data.ProfilePic}));
  })
return ()=>{
  socket.off("CallToUser")
}
},[])
 


  return (
    <>
    <ToastContainer
  position="top-right"
  autoClose={3000}
  hideProgressBar={false}
  newestOnTop={true}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="colored"
/>
    <div className='image overflow-x-hidden scrollbar-hide  w-screen h-screen'>
      <Header/>
     <Outlet/>
     <Footer/>
     </div>
     {ReceivingCall&&!AcceptCall&&<ReceivceCall setReceivingCall={setReceivingCall} setAcceptCall={setAcceptCall}/>}
    </>
  )
}

export default App
