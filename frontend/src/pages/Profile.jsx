import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { User } from '../slices/User.slice';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(null);
  const [Myuser, setMyUser] = useState(null);
  const [IsCurrentUser, setIsCurrentUser] = useState(false);
  const [Request, setRequest] = useState(false);

  const { id } = useParams();
  const dispatch = useDispatch();
  let CurrentUser = useSelector(state => state.user.userData);
  CurrentUser=CurrentUser?CurrentUser:{}
console.log("current user",CurrentUser)
  const handleChange = (field, value) => {
    setUser({ ...user, [field]: value });
  };

  const fetchData = async () => {
    try {
      const resp = await axios.get(`http://localhost:3000/api/v1/Profile/${id}`, {
        withCredentials: true,
      });
      setUser(resp.data.data);
      setMyUser(resp.data.data);
    } catch (error) {
      console.log("Something went wrong while fetching user data:", error.message);
    }
  };

  useEffect(() => {
    if (CurrentUser?._id === id) {
      setIsCurrentUser(true);
    }

   
    
    CurrentUser?.RequestSend?.map((ele)=>{
      console.log(ele.User._id);
      if(ele.User._id==id){
        setRequest(true);
      }
    })

    fetchData();
    console.log(user?.url)
  }, []);

 const handleSave = async () => {
  try {
    const resp = await axios.put(`http://localhost:3000/api/v1/SaveProfile/${id}`, user, {
      withCredentials: true,
    });
    
    localStorage.setItem("Userdata", JSON.stringify(resp.data.data));
    setIsEditing(false);
    dispatch(User(resp.data.data));
    setMyUser(user);
  } catch (error) {
    console.log("Error while saving user data:", error.message);
  }
};

  const sendFriendRequest = async (id) => {
    try {
      const resp = await axios.post(`http://localhost:3000/api/v1/SendFriendRequest/${id}`, {}, {
        withCredentials: true,
      });

      console.log(resp);
      localStorage.setItem("Userdata",JSON.stringify(resp.data.data));
      dispatch(User(resp.data.data));
      setRequest(true);
    } catch (error) {
      console.log("Something went wrong while sending the friend request", error.message);
    }
  };

  const handleCancel = () => {
    setUser(Myuser);
    setIsEditing(false);
  };

  if (!user) {
    return <div className="text-white text-center mt-10">Loading...</div>;
  }

  return (
    <div className="w-screen mt-12 min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 text-white flex justify-center items-start px-4 py-8">
      <div className="w-full max-w-5xl bg-white/5 p-8 md:p-10 rounded-2xl shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <img
            src={user?.profilePic || user?.url}
            alt="Profile"
            className="w-36 h-36 rounded-full object-cover border-4 border-white/30 shadow-lg"
          />
          <div className="flex-1 w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              {isEditing ? (
                <input
                  value={user?.username}
                  onChange={(e) => handleChange('username', e.target.value)}
                  className="text-3xl font-bold bg-transparent border-b border-white/30 w-full sm:w-auto focus:outline-none"
                />
              ) : (
                <h1 className="text-3xl font-bold">{user?.username} </h1>
              )}

              {isEditing ? (
                <div className="flex gap-2">
                  <button onClick={handleSave} className="bg-green-600 px-4 py-1 rounded">Save</button>
                  <button onClick={handleCancel} className="bg-gray-600 px-4 py-1 rounded">Cancel</button>
                </div>
              ) : (
                IsCurrentUser ? (
                  <button onClick={() => setIsEditing(true)} className="bg-violet-600 px-4 py-1 rounded">Edit</button>
                ) : (!Request?(<button
                    className={`w-28 text-sm h-10 text-white rounded-xl  bg-blue-500`}
                    disabled={Request}
                    onClick={() => sendFriendRequest(user._id)}>Request
                   </button>):(
                    <button className='bg-yellow-500 text-white font-semibold text-md px-2 py-2 rounded-xl '>Pending</button>
                   )
                )
              )}
            </div>

            <p className="text-white/70 mt-2">
              {isEditing ? (
                <input
                  value={user?.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="bg-transparent border-b border-white/20 w-full focus:outline-none"
                />
              ) : (
                user?.email
              )}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 mt-6 text-sm md:text-base">
              <Field label="About" value={user?.about} isEditing={isEditing} onChange={(v) => handleChange('about', v)} type="textarea" />
              <Field label="Gender" value={user?.gender} isEditing={isEditing} onChange={(v) => handleChange('gender', v)} />
              <Field label="Age" value={user?.age} isEditing={isEditing} onChange={(v) => handleChange('age', v)} />
              <Field label="Location" value={user?.location} isEditing={isEditing} onChange={(v) => handleChange('location', v)} />
              <Field label="Looking For" value={user?.lookingFor} isEditing={isEditing} onChange={(v) => handleChange('lookingFor', v)} />
            </div>

            <div className="mt-6">
              <ListInput label="Hobbies" list={user?.hobbies} isEditing={isEditing} onChange={(val) => handleChange('hobbies', val)} />
              <ListInput label="Topics to Talk" list={user?.topics} isEditing={isEditing} onChange={(val) => handleChange('topics', val)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Field = ({ label, value, isEditing, onChange, type = 'text' }) => (
  <div>
    <p className="font-semibold">{label}:</p>
    {isEditing ? (
      type === 'textarea' ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-white/10 mt-1 p-2 rounded resize-none"
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-white/10 mt-1 p-2 rounded"
        />
      )
    ) : (
      <p className="text-white/80">{value}</p>
    )}
  </div>
);

const ListInput = ({ label, list, isEditing, onChange }) => (
  <div className="mt-4">
    <p className="font-semibold">{label}:</p>
    {isEditing ? (
      <input
        value={list?.join(', ') || ''}
        onChange={(e) => onChange(e.target.value.split(',').map((item) => item.trim()))}
        className="w-full bg-white/10 mt-1 p-2 rounded"
      />
    ) : (
      <div className="flex flex-wrap gap-2 mt-2">
        {list?.map((item, index) => (
          <span key={index} className="bg-indigo-500/30 text-sm px-3 py-1 rounded-full">
            {item}
          </span>
        ))}
      </div>
    )}
  </div>
);

export default Profile;
