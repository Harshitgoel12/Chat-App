import { io } from "socket.io-client";
const VITE_SOCKET_URL= import.meta.env.VITE_SOCKET_URL
const socket = io(VITE_SOCKET_URL); 

export default socket;