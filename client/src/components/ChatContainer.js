// ChatContainer.jsx
import React, { useEffect, useState,useRef } from 'react';
import { useChatStore } from '../store/useChatStore';
import ChatHeader from './ChatHeader';
import MessageSkeleton from './skeleton/MessageSkeleton';
import MessageInput from './MessageInput';

const ChatContainer = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser,subscribeToMessages,unsubscribeFromMessages } = useChatStore();
  const [user, setUser] = useState(null);
  const messageEndRef=useRef(null);
  
  // Fetch user details once when component mounts
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch("http://localhost:8000/user", {
          method: "GET",
          credentials: "include",
        });
        
        if (!response.ok) {
          throw new Error("Failed to fetch user details");
        }
        
        const data = await response.json();
        setUser(data?.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  // Fetch messages when selectedUser changes
  useEffect(() => {
    if (selectedUser?._id && user) {
      getMessages(selectedUser._id); // Fetch messages initially
      subscribeToMessages(); // Subscribe once
  
      // Cleanup on component unmount or dependency change
      return () => unsubscribeFromMessages();
    }
  }, [selectedUser, user, getMessages, subscribeToMessages, unsubscribeFromMessages]);
  

  // Add a separate effect to monitor messages changes
  useEffect(() => {
    console.log("Messages updated:", messages);
  }, [messages]);
  

  useEffect(()=>{
    if(messageEndRef.current && messages){
    messageEndRef.current.scrollIntoView({behaviour:"smooth"})
    }
  },[messages])


  if (isMessagesLoading || !user) {
    return (
      <div className='flex-1 flex flex-col overflow-auto'>
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }
  
  
  return (
    <div className='flex-1 flex flex-col h-full'>
      <ChatHeader />
      <div className='flex-1 overflow-y-auto p-4'>
        {messages && messages.length > 0 ? (
          messages.map((message) => (
            <div
              key={message._id}
              className={`chat ${message.senderId === user._id ?  "chat-end" :"chat-start"}`}
              ref={messageEndRef}
            >
              
              <div className='chat-header mb-1'>
  <time className='text-xs opacity-50 ml-1'>
    {new Date(message.createdAt).toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })}
  </time>
</div>

              <div className='chat-bubble flex flex-col'>
                {message.image && (
                  <img src={message.image}
                  alt="attachment"
                  className='sm:max-w-[200px] rounded-md mb-2'/>
                )}
                <div>{message.text && <p>{message.text}</p>}</div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            No messages yet. Start the conversation!
          </div>
        )}
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;