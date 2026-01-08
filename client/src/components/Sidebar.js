import React, { useEffect,useState} from 'react'
import { useChatStore } from '../store/useChatStore'
import SidebarSkeleton from './skeleton/SidebarSkeleton';
import { Users } from "lucide-react";
import { getOnlineUsers,getSocket,disconnectSocket } from '../socketManager';
const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const [socket, setSocket] = useState(null);
  const onlineUsers = getOnlineUsers();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [role,setRole]=useState(null)
  useEffect(() => {
    // Initialize socket
    const initSocket = async () => {
      const socketInstance = await getSocket();
      setSocket(socketInstance);
      console.log("Socket instance:", socketInstance);
      const response2 = await fetch("http://localhost:8000/user", {
        method: "GET",
        credentials: "include", 
    });

    if (!response2.ok) throw new Error("Failed to fetch user details");
    const user = await response2.json(); 
    console.log(user.data)
    setRole(user.data.role);
    console.log(user.data.userEmail)
    };

    initSocket();
  }, []); 

  useEffect(() => {
    getUsers();
    console.log(users);
  }, [getUsers]);

  useEffect(() => {
    
    console.log("Online users:", onlineUsers);
  }, [onlineUsers]);
  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;
  console.log(users);
  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      {/* Header */}
      <div className="border-b border-base-300 w-full" style={{ padding: '42px' }}>
        <div className="flex items-center gap-2">
          <Users className="w-6 text-white h-6" />
          <span className="font-medium hidden text-white lg:block">Contacts</span>
        </div>
      </div>

      {/* Users List */}
      <div className="overflow-y-auto w-full py-3  scrollbar-custom">
        {users.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`w-full p-3 flex items-center rounded-lg gap-3 hover:bg-blue-200 transition-colors ${
              selectedUser?._id === user._id ? "bg-blue-300 ring-0.5 ring-blue-400" : ""
            }`}
          >
            <div className="relative  lg:mx-0">
            <img
  src={
    role === "instructor"
      ? "https://gimgs2.nohat.cc/thumb/f/640/download-studying-icon-clipart-computer-icons-study-student-studying-icon--m2H7G6N4Z5N4N4N4.jpg"
      : "https://www.citypng.com/public/uploads/preview/hd-man-user-illustration-icon-transparent-png-701751694974843ybexneueic.png?v=2025011817"
  }
  alt={user.name}
  className="size-12 object-cover rounded-full"
/>

              {onlineUsers.includes(user._id) && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-blue-700 rounded-full ring-2 ring-zinc-900"
                />
              )}
            </div>
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium text-white truncate">{user.name}</div>
              <div className="text-sm text-zinc-500">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
