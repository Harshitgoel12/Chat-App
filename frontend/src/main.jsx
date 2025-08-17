
import * as process from "process";
global.process = process;
import { Buffer } from 'buffer';
window.Buffer = Buffer;
window.process = process;

import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Signup from './pages/Signup.jsx'
import Login from './pages/Login.jsx'
import Otp from './pages/Otp.jsx'
import Contact from './pages/Contact.jsx'
import { Provider } from 'react-redux'
import store from  "./store.js"
import Profile from './pages/Profile.jsx'
import  Home  from './Home.jsx'
import Video from './pages/Video.jsx'
import socket from './socket.js'




const appRouter= createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children :[
      {
        path:"",
        element:<Home/>
      },
      {
        path:"signup",
        element:<Signup/>
      },
      {
        path:"login",
        element:<Login/>
      },
      {
        path:"otp-verification",
        element:<Otp/>
      },
      {
        path:"contacts",
        element:<Contact/>,
        
      },
      {
        path:"Profile/:id",
        element:<Profile/>
      },
      {
        path:"video",
        element:<Video/>
      }

    ]
  }
     
   
])
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <RouterProvider router={appRouter}>
    <App />
    </RouterProvider>
    </Provider>
)
