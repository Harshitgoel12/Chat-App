import React, { useState } from "react";
import Search from "./Search";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { User } from "../slices/User.slice";
import axios from "axios";
import SendedRequest from "./SendedRequest";
import IncommingRequestPage from "./IncommingRequest.jsx";
import { Menu, X } from "lucide-react";
import { toast } from "react-toastify";

const Header = () => {
  const  VITE_URL= import.meta.env.VITE_API_URL
  const [showSearchModal, setSearchModal] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sendRequest, setSendRequest] = useState(false);
  const [incommingRequest, setIncommingRequest] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const user = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await axios.get(`${VITE_URL}/Logout`, {
        withCredentials: true,
      });
      toast.success("Logout Successfully")
      localStorage.removeItem("Userdata");
      dispatch(User(null));
    } catch (err) {
      console.error("Logout failed:", err.message);
      toast.error(err.message);
    }
  };

  return (
    <header className="bg-gradient-to-r   from-blue-500 to-indigo-600 px-6 md:px-12 py-3 shadow-lg fixed top-0 left-0 w-full z-50">
      <div className="flex justify-between items-center text-white">

        <Link
          to="/"
          className="text-2xl font-extrabold tracking-wider hover:text-yellow-300 transition"
        >
          ChatApp
        </Link>

        <nav className="hidden lg:flex gap-5 text-lg font-medium items-center">
           <Link
          to="/"
          className="hover:text-yellow-300 transition"
        >
          Home
        </Link>

          <button
            onClick={() => setSearchModal(true)}
            className="hover:text-yellow-300 transition"
          >
            Search
          </button>
          <button
            onClick={() => setSendRequest(true)}
            className="hover:text-yellow-300 transition"
          >
            Sent Requests
          </button>
          <button
            onClick={() => setIncommingRequest(true)}
            className="hover:text-yellow-300 transition"
          >
            Incoming Requests
          </button>
          <Link to="/Contacts" className="hover:text-yellow-300 transition">
            Contacts
          </Link>
        </nav>

        {/* Right Section */}
        <div className="relative flex items-center gap-3">
          {user ? (
            <>
              <img
                src={user?.profilePic || user?.url}
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="h-10 w-10 rounded-full cursor-pointer border-2 border-white hover:scale-105 transition"
                alt="Profile"
              />
              {dropdownOpen && (
                <div className="absolute right-0 top-12 w-44 bg-white text-black rounded-xl shadow-lg py-2 z-50 animate-fadeIn">
                  <Link
                    to={`/profile/${user?._id}`}
                    className="block px-4 py-2 hover:bg-gray-100 rounded-lg"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg"
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="hidden lg:flex gap-4">
              <Link
                to="/login"
                className="hover:text-yellow-300 text-lg font-semibold"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="hover:text-yellow-300 text-lg font-semibold"
              >
                Signup
              </Link>
            </div>
          )}

        
          <button
            className="lg:hidden text-white"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {mobileMenu && (
        <div className="lg:hidden mt-3 bg-white text-black rounded-xl shadow-md p-4 space-y-3 animate-slideDown">
          <Link
            to="/"
            onClick={() => setMobileMenu(false)}
            className="block w-full text-left hover:bg-gray-100 px-2 py-1 rounded-lg"
          >Home</Link>
          <button
            onClick={() => {
              setSearchModal(true);
              setMobileMenu(false);
            }}
            className="block w-full text-left hover:bg-gray-100 px-2 py-1 rounded-lg"
          >
            Search
          </button>
          <button
            onClick={() => {
              setSendRequest(true);
              setMobileMenu(false);
            }}
            className="block w-full text-left hover:bg-gray-100 px-2 py-1 rounded-lg"
          >
            Sent Requests
          </button>
          <button
            onClick={() => {
              setIncommingRequest(true);
              setMobileMenu(false);
            }}
            className="block w-full text-left hover:bg-gray-100 px-2 py-1 rounded-lg"
          >
            Incoming Requests
          </button>
          <Link
            to="/Contacts"
            onClick={() => setMobileMenu(false)}
            className="block w-full text-left hover:bg-gray-100 px-2 py-1 rounded-lg"
          >
            Contacts
          </Link>
          {!user && (
            <>
              <Link
                to="/login"
                onClick={() => setMobileMenu(false)}
                className="block w-full text-left hover:bg-gray-100 px-2 py-1 rounded-lg"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setMobileMenu(false)}
                className="block w-full text-left hover:bg-gray-100 px-2 py-1 rounded-lg"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      )}

      {showSearchModal && (
        <div className="absolute top-16 left-0 w-full z-40">
          <Search onClose={() => setSearchModal(false)} />
        </div>
      )}


      {sendRequest && <SendedRequest setSendRequest={setSendRequest} />}
      {incommingRequest && (
        <IncommingRequestPage setIncommingRequest={setIncommingRequest} />
      )}
    </header>
  );
};

export default Header;
