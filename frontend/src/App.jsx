
import { Outlet } from 'react-router-dom'
import './App.css';
import Signup from './pages/Signup'
import Header from './pages/Header';
import Image from "./chat.png"
function App() {
  return (
    <>
    <div className='image overflow-x-hidden scrollbar-hide  w-screen h-screen'>
      <Header/>
     <Outlet/>
     </div>
    </>
  )
}

export default App
