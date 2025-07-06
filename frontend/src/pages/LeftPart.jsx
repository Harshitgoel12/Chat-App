import React from 'react'
import { data } from './data'
import { useDispatch, useSelector } from 'react-redux'
import { SelectedUser } from '../slices/User.slice';


const LeftPart = () => {
  const contacts=useSelector(state=>state.user.userData);
  const myContacts=contacts?.myContacts
  const dispatch=useDispatch();
  const SelectUserHandler=(id)=>{
    dispatch(SelectedUser(id));
  }
  return (
    <div className=' w-1/3 scrollbar-hide mt-12 min-h-screen'>
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
