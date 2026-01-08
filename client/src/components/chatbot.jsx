import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
 
  const [messages, setMessages] = useState([
    { role: "model", parts: [{ text: "Hello! How can I help you today?" }] }
  ]);

  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async() => {
    if (inputValue.trim() === '') return;

    const newUserMessage = {
      role: "user",
      parts: [{ text: inputValue }]
    };

    console.log(inputValue);

    setMessages(prev => [...prev, newUserMessage]);
    const tempBotMessage = {
        id: "thinking", 
        role: "model",
        parts: [{ text: "Thinking..." }]
    };
    setMessages(prev => [...prev, tempBotMessage]);

    try {
        const response = await fetch("http://localhost:8000/api-chat", {
            method: "POST",
            credentials:"include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userMessage: inputValue,
                chatHistory: [...messages.filter(m => m.role === "user"), newUserMessage]
            })
        });

        const data = await response.json();
        const botMessage = data.data.modelResponse;

        setMessages(prev =>
            prev.map(m =>
                m.id === "thinking" ? { ...botMessage, role: "model" } : m
            )
        );
   } catch (err) {
        console.error("Chatbot API error:", err);
        setMessages(prev =>
            prev.map(m =>
                m.id === "thinking" ? { role: "model", parts: [{ text: "Oops! Something went wrong." }] }: m
            )
        );
    }
    setInputValue('');
};



  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };



  return (
    <div className="fixed bottom-0 right-0 z-50 ">
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-blue-300 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-110 flex items-center justify-center group"
        >
          <MessageCircle size={24} className="group-hover:scale-110 transition-transform duration-200" />
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-bold animate-pulse">
            1
          </div>
        </button>
      )}

      {/* Chatbox */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 z-10 h-screen top-6  bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col animate-in slide-in-from-bottom-2 duration-300">
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <h3 className="font-semibold">Chat Support</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-blue-700 p-1 rounded transition-colors duration-200"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'} animate-in fade-in slide-in-from-bottom-1 duration-300`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg shadow-sm ${
                    message.role === "model"
                      ? 'bg-blue-100 text-blue-900 border border-blue-200'
                      : 'bg-blue-600 text-white'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.parts[0].text}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-200 bg-white rounded-b-lg">
            <div className="flex items-center space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm text-blue-500"
              />
              <button
                onClick={handleSendMessage}
                disabled={inputValue.trim() === ''}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-colors duration-200 flex items-center justify-center"
              >
                <Send size={16} />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">Press Enter to send</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;