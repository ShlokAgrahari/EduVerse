import React from 'react';
import { useEffect,useState } from 'react';
import { X } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { getOnlineUsers } from '../socketManager';

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const onlineUsers = getOnlineUsers();
  const [role,setRole]=useState(null);

  useEffect(() => {
      
      console.log("Online users:", onlineUsers);
    }, [onlineUsers]);
    useEffect(()=>{
      const getUser=async()=>{
        const response2 = await fetch("http://localhost:8000/user", {
          method: "GET",
          credentials: "include", // Ensure cookies are included in the request
      });
  
      if (!response2.ok) throw new Error("Failed to fetch user details");
      const user = await response2.json(); 
      console.log(user.data)
      setRole(user.data.role);
      }
      getUser();
    })
  return (
    <header className="w-full border-b border-base-300">
      <div className="max-w-full px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="size-10 rounded-full relative">
                <img 
                  src={
                    role === "instructor"
                      ? "https://gimgs2.nohat.cc/thumb/f/640/download-studying-icon-clipart-computer-icons-study-student-studying-icon--m2H7G6N4Z5N4N4N4.jpg"
                      : "https://www.citypng.com/public/uploads/preview/hd-man-user-illustration-icon-transparent-png-701751694974843ybexneueic.png?v=2025011817"
                  }
                  alt="user"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>

            {/* User info */}
            <div className="min-w-0 flex-1">
              <h3 className="font-medium text-white truncate">{selectedUser.name}</h3>
              <p className="text-sm text-base-content/70 truncate">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
              </p>
            </div>
          </div>

          {/* Close button */}
          <button 
            onClick={() => setSelectedUser(null)}
            className="flex-shrink-0 p-2 hover:bg-base-200 rounded-full transition-colors"
            aria-label="Close chat"
          >
            <X className="size-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default ChatHeader;