import { Link, Outlet } from 'react-router-dom';
import './App.css';
import Header from './pages/Header';
import chatImg from './chats.png';

function Home() {
  return (
    <>
      <div className="overflow-x-hidden scrollbar-hide  bg-gradient-to-r from-blue-900 via-black to-purple-900 text-white">


        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center justify-between px-10 py-16 md:py-24">
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold">
              Welcome to <span className="text-purple-400">ChatConnect</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300">
              Real-time messaging, powered by speed and simplicity.
            </p>
            <div className="space-x-4">
              <Link to={"/Contacts"} className="bg-purple-600 font-semibold px-6 py-3 rounded-xl hover:bg-purple-700 transition">
                Get Started
              </Link>
              <Link to={"/login"} className="bg-white font-semibold text-black px-6 py-3 rounded-xl hover:bg-gray-200 transition">
                Login
              </Link>
            </div>
          </div>

          {/* Chat Image */}
          <div className="md:w-1/2  mt-20 md:mt-20 flex items-center justify-center">
            <img
              src={chatImg}
              alt="chat"
              className="w-[300px] md:w-[350px] rounded-2xl shadow-2xl"
            />
          </div>
        </div>

    
      </div>
    </>
  );
}

export default Home;
