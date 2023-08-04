import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Socket } from "socket.io-client";
import "./privateroom.css";

interface PrivateMessagesProps {
  socket: Socket;
  currentUser: { id: string; name: string };
}

interface Message {
  userId: string;
  name: string;
  message: string;
  timestamp: string;
}

const PrivateMessages = ({ socket }: PrivateMessagesProps) => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    socket.on("privateMessageCreated", ({ chatId }) => {
      navigate(`/inbox/${chatId}`);
    });

    socket.on("newMessage", ({ message, name, userId, timestamp }: Message) => {
      const newMessage: Message = { message, name, userId, timestamp };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    socket.emit("joinRoom", {
      chatId: userId,
    });

    return () => {
      socket.off("privateMessageCreated");
      socket.off("newMessage");
    };
  }, [socket, navigate, userId]);

  const sendMessage = () => {
    if (message.trim().length > 0 && userId) {
      socket.emit("privateMessage", {
        // Use "privateMessage" event name
        chatId: userId,
        message,
      });
      console.log(message);
      setMessage("");
    }
  };

  return (
    <div className="private-chat-container">
      <div className="private-chat-header">
        <h2>Private Chat with {userId}</h2>
      </div>
      <div className="private-chat-messages">
        {messages.map((messageObj, index) => (
          <div key={index} className="private-chat-message">
            <span>{messageObj.name}: </span>
            {messageObj.message}
          </div>
        ))}
      </div>
      <div className="private-chat-input">
        <input
          type="text"
          name="message"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default PrivateMessages;
