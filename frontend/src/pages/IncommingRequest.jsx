import axios from 'axios';
import React from 'react';
import { useDispatch } from 'react-redux';
import { User } from '../slices/User.slice';
import { useEffect } from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';

const IncommingRequest = ({ setIncommingRequest }) => {
  const  VITE_URL= import.meta.env.VITE_API_URL
const [RequestReceived,setIncommingReq]=useState([]);
useEffect(()=>{
    const IncommingRequest= async()=>{
             try {
               const resp= await  axios.get(`${VITE_URL}/IncommingRequest`,{
                  withCredentials:true
                 })
                 setIncommingReq(resp.data.request);
           } catch (error) {
              toast.error("Can't fetched the Requests");
           }
    }
    IncommingRequest();
},[])
  const dispatch = useDispatch();

  const handleAcceptRequest = async (id) => {
    try {
      const resp = await axios.post(`${VITE_URL}/AcceptRequest/${id}`, {}, {
        withCredentials: true
      });
      dispatch(User(resp.data.data));
      localStorage.setItem("Userdata", JSON.stringify(resp.data.data));
     setIncommingReq(resp.data.data.RequestReceived)
      toast.success("Request Accepted Successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleRejectRequest = async (id) => {
    try {
      const resp = await axios.post(`${VITE_URL}/RejectRequest/${id}`, {}, {
        withCredentials: true
      });
      localStorage.setItem("Userdata", JSON.stringify(resp.data.data));
      dispatch(User(resp.data.data));
      toast.success("Request Rejected Successfully");
       setIncommingReq(resp.data.data.RequestReceived)
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">
      <div className="bg-white/90 backdrop-blur-md w-full max-w-md max-h-[80vh] rounded-xl shadow-xl p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-transparent">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-700">Incoming Friend Requests</h2>
          <button
            className="text-gray-500 hover:text-red-600 text-lg font-bold"
            onClick={() => setIncommingRequest(false)}
          >
            ✕
          </button>
        </div>

        {RequestReceived.length === 0 ? (
          <p className="text-gray-500 text-center mt-10">No new friend requests.</p>
        ) : (
          RequestReceived.map((ele, idx) => (
            <div key={idx} className="flex justify-between items-center bg-white rounded-lg shadow p-3 mb-4">
              <div className="flex items-center gap-3">
                <img
                  src={ele.url}
                  alt="avatar"
                  className="h-12 w-12 rounded-full object-cover"
                />
                <h1 className="font-medium text-gray-800">{ele.Username}</h1>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleAcceptRequest(ele._id)}
                  className="bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-1 rounded-full"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleRejectRequest(ele._id)}
                  className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded-full"
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default IncommingRequest;
