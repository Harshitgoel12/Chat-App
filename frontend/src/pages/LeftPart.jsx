
import { useDispatch, useSelector } from 'react-redux'
import { SelectedUser } from '../slices/User.slice';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

const LeftPart = () => {
const [myContacts,setContacts]=useState([]);
  useEffect(()=>{
   const fun = async()=>{
    try {
       const data=await axios.get("http://localhost:3000/api/v1/MyContacts",{
        withCredentials:true
       })
       console.log("my contacts ",data);
    setContacts(data.data.request);
    } catch (error) {
      console.log("something went wrong while fetching all contacts",error.message);
    }
   }
   fun();
  },[])
   const Selecteduser = useSelector((state) => state.user.Receiver);
  const dispatch=useDispatch();
  const SelectUserHandler=(id)=>{
    dispatch(SelectedUser(id));
  }
  
  return (
    <div className={`w-screen md:w-1/3 ${Selecteduser?"md:flex hidden ":""} scrollbar-hide md:mt-12 mt-20 min-h-screen`}>
      <div className='w-full min-h-screen bg-transparent shadow-xl shadow-amber-400 backdrop-blur-sm  '>
      <div className='w-full'>
       
    {myContacts?.map((ele, i) => (
      <div
        key={i}
        onClick={()=>SelectUserHandler(ele)}
        className="flex items-center gap-4 ms-3 p-5  mb-4 w-full rounded-xl backdrop-blur-2xl bg-white/10 shadow-md hover:shadow-lg transition-shadow duration-300"
      >
        <img
          src={ele?.url}
          alt={ele.Username}
          className="h-16 w-16 rounded-full border border-white/30 shadow-sm"
        />
        
        <div>
        <h1 className="text-white text-lg font-semibold tracking-wide">{ele.Username}</h1>
        <h1 className='text-green-400 text-sm '>Online</h1>
        </div>

      </div>
    ))}
  </div>


      </div>
    </div>
  )
}

export default LeftPart
