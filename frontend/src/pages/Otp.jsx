import { useState } from 'react'
import OTPInput from "otp-input-react";
import axios from "axios"
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ClipLoader from "react-spinners/ClipLoader";

const Otp = () => {
  const  VITE_URL= import.meta.env.VITE_API_URL
    const [otp, setOTP] = useState("");
    const[loading,setLoading]=useState(false);
    const navigate=useNavigate();
    const userdata= useSelector(state=>state.user.userData)
   const handleSubmit=async(e)=>{
    e.preventDefault();
   try {
    setLoading(true)
     const response= await axios.post(`${VITE_URL}/opt-verification`,{otp,Email:userdata.Email},{
      withCredentials:true
     })
     if(response.data.success==false){
       throw new Error(response.data.message);
     }
     toast.success("OTP Verified Successfully")
   const res=await axios.post(`${VITE_URL}/signup`,userdata,{
    withCredentials:true
   })
 if(res.data.success==false){
  throw new Error(res.data.message);
 }
 navigate("/login")
   } catch (error) {
    toast.error(error.message)
   }
   finally{
    setLoading(false)
   }

   }
  return (
    <div className='w-full  h-screen flex justify-center md:items-start items-center  md:mt-40 mt-20  md:ms-20 overflow-x-hidden'>
      <div className="flex  h-1/ flex-col rounded-xl items-center  bg-transparent shadow-2xl pb-5 px-5 shadow-amber-400">
        <h1 className='text-white text-center font-bold text-3xl mb-4 '>Verify OTP</h1>
     <OTPInput
  value={otp}
  onChange={setOTP}
  autoFocus
  OTPLength={4}
  otpType="number"
  secure={false}
  className="flex gap-2"
  inputStyles={{
    width: "54px",
    height: "60px",
    fontSize: "28px",
    borderRadius: "12px",
    backgroundColor: "#F0FDFA", 
    color: "#000",
    textAlign: "center",
    
  }}
/>
<button className='text-white self-end mt-5 bg-blue-400 px-3 py-2 font-semibold text-md rounded-xl cursor-pointer' onClick={handleSubmit}
disabled={loading}
>{loading ? (
  <div className="flex gap-4 w-full justify-center items-center text-center">
    <ClipLoader
      size={20} 
      color="#000000" 
      loading={true}
    />
    <p>submiting</p>
  </div>
) : (
  "Submit"
)}</button>
    </div>
    </div>
  )
}

export default Otp
