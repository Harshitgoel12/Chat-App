import React, { useEffect, useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";


const dummyUsers = [
  { name: "Krish", avatar: "https://randomuser.me/api/portraits/men/75.jpg" },
  { name: "Anjali", avatar: "https://randomuser.me/api/portraits/women/65.jpg" },
  { name: "Rohit", avatar: "https://randomuser.me/api/portraits/men/85.jpg" },
  { name: "Simran", avatar: "https://randomuser.me/api/portraits/women/45.jpg" },
  { name: "Aman", avatar: "https://randomuser.me/api/portraits/men/55.jpg" },
];

const Search = ({ onClose }) => {
  const navigate=useNavigate();
  const [query, setQuery] = useState("");
  const [Users,setUsers]=useState([]);
  async function fun(){
  
   const resp= await axios.post("http://localhost:3000/api/v1/Search/",{},{
      withCredentials:true
     })
     setUsers(resp.data.data);
  }
useEffect(()=>{
    fun();
},[])
  const filteredUsers = Users?.filter((user) =>
    user.Username.toLowerCase().includes(query.toLowerCase())
  );
  console.log("ye rhe filtered user ",filteredUsers)


  const handleNavigation=(id)=>{
    navigate("/Profile/"+id)
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-start justify-center pt-20">
      <div className="bg-white w-full max-w-lg rounded-xl p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-black text-xl"
        >
        <RxCross1  className="text-xl font-extrabold"/>
        </button>
        <input
          type="text"
          placeholder="Search users..."
          className="w-full mt-4 border border-gray-300 rounded-md p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="space-y-3 max-h-72 overflow-y-auto">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-2 hover:bg-gray-100 rounded-md cursor-pointer" onClick={()=>handleNavigation(user._id)}
              >
                <img
                  src={user.url}
                 
                  className="w-10 h-10 rounded-full"
                />
                <span className="text-gray-800 font-medium">{user.Username}</span>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No users found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;



