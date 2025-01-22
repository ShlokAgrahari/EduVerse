// src/socket/socketManager.js
import { io } from "socket.io-client";

let socket = null;
let onlineUsers = new Set();

export const initializeSocket = (userId) => {
  //if (!userId || socket?.connected) return;
  if (!userId) return null;

  if (socket && !socket.connected) {
    socket = null;
  }

  if(!socket){
    socket = io("http://localhost:8000", {
    query: { userId }
  });
}

  socket.connect();

  socket.on("getOnlineUsers", (users) => {
    onlineUsers = new Set(users);
  });
console.log(socket);
console.log(onlineUsers);
  return socket;
};

export const disconnectSocket = () => {
  if (socket?.connected) {
    socket.disconnect();
    socket = null;
  }
};

export const getSocket = async () => {
    // If socket doesn't exist or is disconnected, try to get user ID and reinitialize
    if (!socket || !socket.connected) {
      try {
        const response = await fetch("http://localhost:8000/user", {
          method: "GET",
          credentials: "include",
        });
  
        if (response.ok) {
          const user = await response.json();
          if (user.data?._id) {
            return initializeSocket(user.data._id);
          }
        }
      } catch (error) {
        console.error("Error reinitializing socket:", error);
      }
    }
    return socket;
  };
export const getOnlineUsers = () => Array.from(onlineUsers);