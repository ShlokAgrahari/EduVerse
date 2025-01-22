import React, { createContext, useState } from "react";
import { io } from "socket.io-client";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [socket, setSocket] = useState(null);

  const connectSocket = (userId) => {
    if (socket) socket.disconnect(); // Disconnect existing socket
    const newSocket = io("http://localhost:8000", { query: { userId } });
    setSocket(newSocket);
  };

  const logout = async () => {
    try {
      await fetch("http://localhost:8000/logout", { method: "POST", credentials: "include" });
      setAuthUser(null);
      if (socket) socket.disconnect();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, connectSocket, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
