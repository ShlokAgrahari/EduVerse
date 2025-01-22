import {create} from "zustand";
import toast from "react-hot-toast"
import { getSocket } from "../socketManager";
import { io } from "socket.io-client";
export const useChatStore=create((set,get)=>({
    messages:[],
    users:[],
    selectedUser:null,
    isUserLoading:false,
    isMessagesLoading:false,

    getUsers: async () => {
        set({ isUsersLoading: true });
        try {
          const response = await fetch("http://localhost:8000/messages/users", {
            method: "GET",
            credentials: "include", // Include credentials like cookies in the request
          });
          if (!response.ok) {
            // Handle HTTP errors
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to fetch users");
          }
          console.log(response);
          const data = await response.json();
          const uniqueUsers = data.filter(
            (user, index, self) =>
              index === self.findIndex((u) => u.name === user.name)
          );
    
          set({ users: uniqueUsers });
          console.log(data);
        } catch (error) {
          toast.error(error.message || "An error occurred while fetching users");
        } finally {
          set({ isUsersLoading: false });
        }
      },
      
      // Updated getMessages function in your store
getMessages: async (userId) => {
  set({ isMessagesLoading: true, messages: [] }); // Clear existing messages
  
  try {
    const response = await fetch(`http://localhost:8000/messages/${userId}`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch messages");
    }

    const data = await response.json();
    
    // Ensure messages are sorted by timestamp if available
    const sortedMessages = data.sort((a, b) => 
      new Date(a.createdAt) - new Date(b.createdAt)
    );
    console.log("fetched messages are",sortedMessages)
    set({ messages: sortedMessages });
  } catch (error) {
    toast.error(error.message || "An error occurred while fetching messages");
    set({ messages: [] }); // Reset messages on error
  } finally {
    set({ isMessagesLoading: false });
  }
},

      
      sendMessage: async (messageData) => {
        const { selectedUser, messages } = get();
        try {
          const response = await fetch(`http://localhost:8000/messages/send/${selectedUser._id}`, {
            method: "POST",
            credentials: "include", // Include credentials like cookies in the request
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(messageData),
          });
          if (!response.ok) {
            // Handle HTTP errors
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to send the message");
          }
          const data = await response.json();
          set({ messages: [...messages, data] });
        } catch (error) {
          toast.error(error.message || "An error occurred while sending the message");
        }
      },
      
     subscribeToMessages:async () => {
        const { selectedUser } = get();
        if (!selectedUser) return;
    
        const socket = await getSocket();
    
        socket.on("newMessage", (newMessage) => {
          const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
          if (!isMessageSentFromSelectedUser) return;
    
          set({
            messages: [...get().messages, newMessage],
          });
        });
      },
    
      unsubscribeFromMessages:async () => {
        const socket = await getSocket();
        socket.off("newMessage");
      },
      
      setSelectedUser: (selectedUser) => set({ selectedUser }),
}))