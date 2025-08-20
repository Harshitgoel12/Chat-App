import React, { useEffect, useRef, useState } from 'react';
import Peer from 'simple-peer';
import socket from '../socket';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { RiVideoOnFill } from "react-icons/ri";
import { BsFillCameraVideoOffFill } from "react-icons/bs";
import { FaMicrophone } from "react-icons/fa6";
import { IoMdMicOff } from "react-icons/io";



const Video = () => {
  const myuser = useSelector((state) => state.user.userData);
  const myID = myuser?._id;
  const SelectedUser = useSelector((state) => state.user.Receiver);
  const CallerData = useSelector((state) => state.CallerDetails.CallerData);

  const VideoRef = useRef(null);
  const userVideo = useRef(null);
  const ConnectionRef = useRef(null);
  const isCallInitialized = useRef(false);

  const location = useLocation();
  const navigate = useNavigate();
  const caller = location.state?.caller;

  const [stream, setStream] = useState(null);
  const [ReceiverStream, setReceiverStream] = useState(null);
  const [cameraOn, setCameraOn] = useState(true);
  const [micOn, setMicOn] = useState(true);
  const [callEnded, setCallEnded] = useState(false);

  useEffect(() => {
    return () => {
      isCallInitialized.current = false;
    };
  }, []);

  useEffect(() => {
    if (isCallInitialized.current || callEnded) return;
    isCallInitialized.current = true;

    if (ConnectionRef.current) {
      ConnectionRef.current.destroy();
      ConnectionRef.current = null;
    }

    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      setStream(stream);
      if (VideoRef.current) VideoRef.current.srcObject = stream;

      const peer = new Peer({
        initiator: caller,
        trickle: false,
        stream,
      });

      if (caller) {
        peer.on('signal', (data) => {
          socket.emit('CallToUser', {
            signal: data,
            myID,
            CallToUser: SelectedUser?._id,
            userName: myuser.Username,
            ProfilePic: myuser.url,
          });
        });
      } else {
        peer.signal(CallerData.signal);
        peer.on('signal', (data) => {
          socket.emit('AnswerCall', {
            signal: data,
            myID,
            CallToUser: CallerData.callerId,
            userName: myuser.Username,
            ProfilePic: myuser.url,
          });
        });
      }

      peer.on('stream', (remoteStream) => {
        if (userVideo.current) userVideo.current.srcObject = remoteStream;
        setReceiverStream(remoteStream);
      });

      ConnectionRef.current = peer;
    });
  }, [caller, callEnded]);

  
  useEffect(() => {
    const handleAnswerCall = (data) => {
      ConnectionRef.current?.signal(data.signal);
    };

    const handleRejectCall = () => {
      endCall();
    };

    const handleCallEnded = () => {
      endCall();
    };

    socket.on('AnswerCall', handleAnswerCall);
    socket.on('rejectCall', handleRejectCall);
    socket.on('CallEnded', handleCallEnded);

    return () => {
      socket.off('AnswerCall', handleAnswerCall);
      socket.off('rejectCall', handleRejectCall);
      socket.off('CallEnded', handleCallEnded);
    };
  }, [stream]);


  const endCall = () => {
    console.log("Call End Triggered");

    setCallEnded(true);

    stream?.getTracks().forEach((track) => track.stop());

    if (VideoRef.current) VideoRef.current.srcObject = null;
    if (userVideo.current) userVideo.current.srcObject = null;

    if (ConnectionRef.current) {
      ConnectionRef.current.destroy();
      ConnectionRef.current = null;
    }

    setStream(null);
    setReceiverStream(null);

    socket.emit('CallEnded', {
      Other: SelectedUser?._id?SelectedUser._id:CallerData?.callerId,
    });

    navigate('/contacts');
  };




   const toggleMic = () => {
    if (stream) {
      stream.getAudioTracks().forEach(track => {
        track.enabled = !micOn;
      });
      setMicOn(!micOn);
    }
  };


   const toggleCamera = () => {
    if (stream) {
      stream.getVideoTracks().forEach(track => {
        track.enabled = !cameraOn;
      });
      setCameraOn(!cameraOn);
    }
  };

  return (
    <div className="relative w-screen h-screen bg-black text-white font-sans overflow-hidden">
      
      <div className="absolute inset-0 flex items-center justify-center">
        <video
          ref={userVideo}
          autoPlay
          playsInline
          className="w-full h-full object-contain bg-black rounded-xl shadow-xl"
        />
      </div>

      
      <video
        ref={VideoRef}
        autoPlay
        playsInline
        muted
        className="absolute bottom-32 lg:bottom-4 right-4 w-[280px] md:w-[290px]  h-[200px] md:h-auto aspect-video object-cover rounded-xl border-4 border-white shadow-xl z-30"
      />

      <div className="absolute bottom-6 left-36 md:left-1/2 transform -translate-x-1/2 flex flex-wrap items-center justify-center gap-2 px-4 z-40">
        <button
          onClick={endCall}
          className="bg-red-600 hover:bg-red-700 px-5 py-2 md:px-6 md:py-3 rounded-full text-sm md:text-base font-semibold shadow-lg transition-all duration-200"
        >
           End Call
        </button>

        <button
          
          className="bg-gray-700 hover:bg-gray-600 px-4 py-2 md:px-5 md:py-3 rounded-full text-lg shadow-md transition"
          title={micOn ? 'Mute Mic' : 'Unmute Mic'}
          onClick={toggleMic}
        >
          {micOn ? <FaMicrophone /> : <IoMdMicOff />
}
        </button>

        <button
          
          className="bg-gray-700 hover:bg-gray-600 px-4 py-2 md:px-5 md:py-3 rounded-full text-lg shadow-md transition"
          title={cameraOn ? 'Turn Off Camera' : 'Turn On Camera'}
          onClick={toggleCamera}
        >
          {cameraOn ? <RiVideoOnFill className='text-green-500' />: <BsFillCameraVideoOffFill className='text-red-500'/>
}
        </button>
      </div>
    </div>
  );
};

export default Video;
