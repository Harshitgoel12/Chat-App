import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { User } from '../slices/User.slice';

const Login = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const [LoginData,setLoginData]=useState({
    Email:"",
    Password:"",
  })

  const handleChange=(e)=>{
    setLoginData(prev=>({...prev,[e.target.name]:e.target.value}));
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
       const resp=await axios.post("http://localhost:3000/api/v1/Login",LoginData,{
        withCredentials:true
       })
       if(resp.data.success==false){
        throw new Error(resp.data.message);
       }
       console.log(resp.data.data)
       localStorage.setItem("Userdata",JSON.stringify(resp.data.data));
        dispatch(User(resp.data.data))
       navigate("/");
       
    } catch (error) {
      console.log("something went wrong while attampting to login",error.message);
    }
  }
  return (
    <div className='h-full w-full flex items-center justify-center'>
      <div className='bg-transparent lg:w-1/3  md:w-1/2 w-3/4 px-4 py-4 min-h-1/2 backdrop-blur-sm rounded-xl shadow-gray-900 shadow-2xl '>
      <h1 className='text-white text-2xl  mt-4 font-bold font-sans text-center '>Login</h1>
      <form action="" className='flex flex-col items-center'> 
      <input type="email" placeholder='Enter Email ID' value={LoginData.Email} onChange={handleChange} required name='Email'className='w-11/12 outline-none h-12 text-black rounded-xl px-3 mt-5 bg-gray-50'/>
      <input type="password" placeholder='Enter Password' value={LoginData.Password} required onChange={handleChange} name='Password' className='w-11/12 outline-none h-12 text-black rounded-xl px-3 mt-5 bg-gray-50'/>
      <button type='submit' onClick={handleSubmit} className='bg-blue-500 text-white h-10 rounded-lg  w-11/12 outline-none mt-6 font-bold text-lg'>Login</button>
      </form>
      <h1 className='text-center text-gray-200 mt-2 text-sm'>Do'nt Have Account ? <Link to={"/signup"}>Signup</Link></h1>
      </div>
    </div>

    
  )
}

export default Login;
