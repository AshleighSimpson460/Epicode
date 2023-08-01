import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Socket } from "socket.io-client";
import { generatePrivateId } from "../utils/generatePrivateId.js";
import "./privateroom.css";

interface PrivateMessagesProps {
  socket: Socket;
  currentUser: { id: string; name: string };
}

interface Message {
  userId: string;
  name: string;
  message: string;
}

const PrivateMessages = ({ socket, currentUser }: PrivateMessagesProps) => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    socket.on("privateMessageCreated", ({ chatId }) => {
      navigate(`/inbox/${chatId}`);
    });

    socket.on("newMessage", ({ message, name, userId }: Message) => {
      const newMessage: Message = { message, name, userId };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off("privateMessageCreated");
      socket.off("newMessage");
    };
  }, [socket, navigate]);

  const startPrivateMessages = () => {
    const chatId = generatePrivateId(currentUser.id, userId);
    socket.emit("startPrivateMessages", {
      chatId,
      participants: [currentUser.id, userId],
    });
  };

  const sendMessage = () => {
    if (message.trim().length > 0) {
      socket.emit("privateMessage", {
        chatId: userId,
        message,
      });
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
