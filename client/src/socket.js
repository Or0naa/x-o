import { io } from 'socket.io-client';

// const URL = 'http://localhost:3000';
const URL = "https://x-o-sos2.onrender.com"
export const socket = io(URL, {
  // autoConnect: false,
});