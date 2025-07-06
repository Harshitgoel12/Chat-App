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
import SendedRequest from './pages/SendedRequest.jsx'
import IncommingRequest from './pages/IncommingRequest.jsx'

const appRouter= createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
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
        path:"/contacts",
        element:<Contact/>,
        
      },
      {
        path:"/Profile/:id",
        element:<Profile/>
      },
     
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
