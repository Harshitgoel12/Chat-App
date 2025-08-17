import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Paperclip } from 'lucide-react';
import socket from '../socket';
import DefaultPage from './DefaultPage';
import { useNavigate } from 'react-router-dom';
import Peer from "simple-peer"

const RightPart = () => {
  const myuser = useSelector((state) => state.user.userData);
  const myID = myuser?._id;
  const SelectedUser = useSelector((state) => state.user.Receiver);

  const [input, setInput] = useState('');
  const [Messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const navigate=useNavigate();

  // Fetch chat history
  const fetchAllMessages = async () => {
    try {
      const resp = await axios.get(
        `http://localhost:3000/api/v1/Fetch-Chats/${SelectedUser?._id}`,
        { withCredentials: true }
      );
      if (!resp.data.success) throw new Error(resp.data.message);
      setMessages(resp.data.data);
    } catch (error) {
      console.log('Error fetching messages:', error.message);
    }
  };

  useEffect(() => {
    if (SelectedUser) fetchAllMessages();
  }, [SelectedUser]);

  const handleSend = async () => {
    if (!input.trim()) return;

    try {
      const resp = await axios.post(
        `http://localhost:3000/api/v1/Send-Message/${SelectedUser._id}`,
        { message: input },
        { withCredentials: true }
      );

      socket.emit('send-msg', {
        from: myID,
        to: SelectedUser._id,
        message: input,
      });

      setInput('');
      setMessages((prev)=>[...prev,resp.data.data]);
    } catch (error) {
      console.log('Send error:', error.message);
    }
  };


  useEffect(() => {
    const handleReceive = (data) => {
      setMessages((prev) => [
        ...prev,
        {
          senderId: data.from,
          message: data.message,
          file: data.file,
          fileType: data.fileType,
        },
      ]);
    };

    socket.on('msg-receive', handleReceive);
    return () => socket.off('msg-receive', handleReceive);
  }, []);


  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const resp = await axios.post(
        `http://localhost:3000/api/v1/Send-File/${SelectedUser._id}`,
        formData,
        {
          withCredentials: true,
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
console.log(resp.data.data);
      const { file, fileType } = resp.data.data;
console.log(file,fileType)
      socket.emit('send-msg', {
        from: myID,
        to: SelectedUser._id,
        message: '',
        file: file,
        fileType,
      });

      setMessages((prev)=>[...prev,resp.data.data]);
    } catch (error) {
      console.log('File send error:', error.message);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [Messages]);


if(!SelectedUser){
  return <DefaultPage/>
}


const handleCall=()=>{
      
      navigate('/video',{state:{caller:true}});
}


  return (
    <div className="fixed md:top-12 top-20 right-0 w-full md:w-[66.5%] h-[calc(100vh-3rem)] bg-cover bg-center overflow-hidden">
      <div className="w-full h-full flex flex-col justify-between p-4 md:p-6 backdrop-blur-sm bg-white/10 rounded-l-xl shadow-inner shadow-black/30">
        
        
        <div className="flex items-center gap-4 mb-4 border-b border-white/10 pb-3">
          <img src={SelectedUser?.url} className="h-12 w-12 rounded-full" alt="user" />
          <div>
            <h2 className="text-white font-bold text-lg">{SelectedUser?.Username}</h2>
            <p className="text-green-400 text-sm">Online</p>
            <p className='text-white  cursor-pointer' onClick={handleCall}>Call</p>
          </div>
        </div>

        
        <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-hide">
          {Messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-2 rounded-lg md:max-w-68 max-w-56 text-white break-words ${
                msg.senderId === myID ? 'bg-white/20 self-end ml-auto' : 'bg-blue-800/60'
              }`}
            >
              {msg.message && <span>{msg.message}</span>}

              {msg.file && (
                <div className="mt-2">
                  {['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(msg.fileType?.toLowerCase()) ? (
                    <img
                      src={msg.file}
                      alt="Sent file"
                      className="w-full rounded-lg shadow-md border border-white/20"
                    />
                  ) : (
                    <a
                      href={msg.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-300 hover:text-blue-500 underline"
                    >
                      📎 Download {msg.fileType?.toUpperCase()} File
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="mt-4 flex items-center gap-3">
          <div className="relative">
            <button onClick={triggerFileInput} type="button">
              <Paperclip className="w-6  md:mb-0 mb-10 h-6 ms-2 text-white" />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          <input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1 ps-3 md:mb-0 mb-10 bg-white/20 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-200"
          />

          <button
            onClick={handleSend}
            className="bg-blue-600 md:mb-0 mb-10 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default RightPart;
