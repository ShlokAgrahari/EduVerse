import ChatContainer from "./components/ChatContainer";
import Sidebar from "./components/Sidebar";
import { useChatStore } from "./store/useChatStore";
import NoChatSelected from "./components/NoChatSelected";
import React from 'react'

const ChatPage = () => {
  const {selectedUser}=useChatStore();
  
  return (
    <div className="h-screen bg-blue-50">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />

            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatPage