
import { useDispatch, useSelector } from 'react-redux'
import { SelectedUser } from '../slices/User.slice';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import DefaultPage from './DefaultPage';

const LeftPart = () => {
  const  VITE_URL= import.meta.env.VITE_API_URL
const [myContacts,setContacts]=useState([]);
const onlineusers= useSelector((state)=>state.OnlineUserStore.data);
  useEffect(()=>{
   const fun = async()=>{
    try {
       const data=await axios.get(`${VITE_URL}/MyContacts`,{
        withCredentials:true
       })
    setContacts(data.data.request);
    } catch (error) {
      toast.error("Can't Fetched Contacts")
    }
   }
   fun();
  },[])
   const Selecteduser = useSelector((state) => state.user.Receiver);
  const dispatch=useDispatch();
  const SelectUserHandler=(id)=>{
    dispatch(SelectedUser(id));
  }

  if(myContacts.length==0){
return <DefaultPage data={"You have No Connection Please Make you connection"}/>;
  }


  
  return (
    <div className={`w-screen md:w-2/3 ${Selecteduser?"md:flex hidden ":""} scrollbar-hide mt-12  min-h-screen`}>
      <div className='w-full min-h-screen bg-transparent  backdrop-blur-sm  '>
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
  {onlineusers&&onlineusers.includes(String(ele._id))
 ? (
    <h1 className='text-green-400 text-sm'>Online</h1>
  ) : (
    <h1 className='text-red-500 text-sm'>Offline</h1>
  )}
</div>


      </div>
    ))}
  </div>


      </div>
    </div>
  )
}

export default LeftPart
