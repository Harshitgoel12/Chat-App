import React, { useState } from 'react';
import Search from './Search';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { User } from '../slices/User.slice';
import axios from 'axios';
import SendedRequest from './SendedRequest';
import IncommingRequestPage from "./IncommingRequest.jsx"


const Header = () => {
  const [showSearchModal, setSearchModal] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sendRequest,setSendRequest]=useState(false);
  const [IncommingRequest,setIncommingRequest]=useState(false);

  const user = useSelector((state) => state.user.userData);
  console.log("user is", user)
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:3000/api/v1/Logout', { withCredentials: true });
      localStorage.removeItem('Userdata');
      dispatch(User(null));
    } catch (err) {
      console.error("Logout failed:", err.message);
    }
  };

  return (
    <header className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 md:px-12 py-3 shadow-md fixed top-0 left-0 w-full z-50">
      <div className="flex justify-between items-center text-white">
        {/* Brand */}
        <Link to="/" className="text-2xl font-bold tracking-wider">ChatApp</Link>

        {/* Navigation */}
        <nav className="hidden md:flex gap-6 text-lg font-medium">
          <button onClick={() => setSearchModal(true)} className="hover:text-yellow-300 transition">Search</button>
          <h1  className="hover:text-yellow-300 transition cursor-pointer" onClick={()=>setSendRequest(true)}>Sent Requests</h1>
          <h1 className="hover:text-yellow-300 transition cursor-pointer" onClick={()=>setIncommingRequest(true)}>Incoming Requests</h1>
          <Link to={'/Contacts'}>Contacts</Link>
        </nav>


        <div className="relative">
          {user ? (
            <>
              <img
                src={user?.profilePic ||user?.url}
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="h-10 w-10 rounded-full cursor-pointer border-2 border-white"
                alt="Profile"
              />
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white text-black rounded shadow-lg py-2 z-50">
                  <Link to={`/profile/${user?._id}`} className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-gray-100">Logout</button>
                </div>
              )}
            </>
          ) : (
            <div className="flex gap-4">
              <Link to="/login" className="hover:text-yellow-300 text-lg font-semibold">Login</Link>
              <Link to="/signup" className="hover:text-yellow-300 text-lg font-semibold">Signup</Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden mt-2 flex justify-center gap-4 text-white text-sm">
        <button onClick={() => setSearchModal(true)} className="hover:underline">Search</button>
        <h1 onClick={()=>setSendRequest(true)} className="hover:underline">Sent</h1>
        <h1 className="hover:underline cursor-pointer" onClick={()=>setIncommingRequest(true)}>Incoming</h1>
        <Link to={"/Contacts"} className='cursor-pointer'>Contacts</Link>
      </div>

      {/* Search Modal */}
      {showSearchModal && (
        <div className="absolute top-16 left-0 w-full z-40">
          <Search onClose={() => setSearchModal(false)} />
        </div>
      )}

      {sendRequest&&<SendedRequest setSendRequest={setSendRequest}/>}
      {IncommingRequest&&<IncommingRequestPage  setIncommingRequest={setIncommingRequest}/>}
    </header>
  );
};

export default Header;
