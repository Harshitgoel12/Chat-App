import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import {useDispatch} from "react-redux"
import { User } from '../slices/User.slice';
import axios from 'axios';

const Signup = () => {
  const dispatch= useDispatch();
const navigate=useNavigate();
  const [UserData,setUserData]=useState({
    Username:"",
    Email:"",
    Password:"",
    ConfirmPassword:"",
    url:"https://xsgames.co/randomusers/avatar.php?g=male"
  })
  const handleChange=(e)=>{
    setUserData(prev=>({...prev,[e.target.name]:e.target.value})) 
  }

  const handleSubmit=async (e)=>{
   e.preventDefault();
   try {
    console.log(UserData.url)
     if(UserData.Password!=UserData.ConfirmPassword){
       throw new Error("Incurrect Password")
     }
     const response=await axios.post("http://localhost:3000/api/v1/send-otp",{Email:UserData.Email})
     if(response.data.sucess==false){
       throw new Error(response.data.message);
     }
     dispatch(User(UserData));
 
     navigate("/otp-verification");
   } catch (error) {
    console.log(error.message)
   }
  }
  return (
    <div className='h-11/12 w-full flex items-center justify-center '>
      <div className='bg-transparent lg:w-1/3  md:w-1/2 w-3/4 px-4 py-4 min-h-1/2 backdrop-blur-sm rounded-xl shadow-gray-900 shadow-2xl '>
      <h1 className='text-white text-2xl font-bold font-sans text-center '>Sign Up</h1>
      <form  className='flex flex-col items-center'> 
      <input type="text" placeholder='Enter Username' value={UserData.username} required name='Username' onChange={handleChange} className='w-11/12 outline-none h-12 text-black rounded-xl px-3 mt-4 bg-gray-50'/>
      <input type="email" placeholder='Enter Email ID' value={UserData.Email} required name='Email' onChange={handleChange} className='w-11/12 outline-none h-12 text-black rounded-xl px-3 mt-4 bg-gray-50'/>
      <input type="password" placeholder='Enter Password' value={UserData.Password} required name='Password' onChange={handleChange} className='w-11/12 outline-none h-12 text-black rounded-xl px-3 mt-4 bg-gray-50'/>
      <input type="password"  placeholder='Confirm Password' value={UserData.ConfirmPassword} required onChange={handleChange} name='ConfirmPassword'className='w-11/12 outline-none h-12 text-black rounded-xl px-3 mt-4 bg-gray-50'/>
      <button onClick={handleSubmit} type='submit' className='bg-blue-500 text-white h-10 rounded-lg  w-11/12 outline-none mt-5 font-bold text-lg'>Sign Up</button>
      </form>
      <h1 className='text-center text-gray-200 mt-2  text-sm'>Already Have Account ? <Link to={'/login'}>Login</Link></h1>
      </div>
    </div>

  )
  
}

export default Signup;
