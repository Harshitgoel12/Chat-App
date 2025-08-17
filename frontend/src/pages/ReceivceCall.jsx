import React from 'react';
import { useSelector } from 'react-redux';
import { Phone, PhoneOff } from 'lucide-react';
import socket from '../socket';
import { useNavigate } from 'react-router-dom';

const ReceivceCall = ({setReceivingCall,setAcceptCall}) => {
  const CallerData = useSelector((state) => state.CallerDetails.CallerData);
  const navigate=useNavigate();
   const handleAcceptCall = ()=>{
setAcceptCall(true)
setReceivingCall(false);
navigate("/video",{state:{caller:false}})

}

const handleRejectCall=()=>{
setReceivingCall(false);
socket.emit("rejectCall",{
  CallerID:CallerData.callerId,

})
}


  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white w-[90%] md:w-[30rem] rounded-xl shadow-2xl p-6 text-center">
        <img
          src={CallerData?.ProfilePic}
          alt="Caller"
          className="w-24 h-24 rounded-full mx-auto shadow-lg mb-4 object-cover"
        />
        <h2 className="text-xl font-semibold text-gray-800">
          {CallerData?.userName} is calling you...
        </h2>

        <div className="mt-6 flex justify-center gap-6">
          <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full shadow-md flex items-center gap-2 transition" onClick={handleAcceptCall}>
            <Phone size={20} />
            Accept
          </button>

          <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full shadow-md flex items-center gap-2 transition" onClick={handleRejectCall}>
            <PhoneOff size={20} />
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReceivceCall;




