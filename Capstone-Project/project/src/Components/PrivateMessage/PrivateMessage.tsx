import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Socket } from "socket.io-client";

interface PrivateMessagesProps {
  socket: Socket;
  user: { id: string };
}

interface Message {
  userId: string;
  name: string;
  message: string;
}

const PrivateMessages = ({ socket, user }: PrivateMessagesProps) => {
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
    socket.emit("startPrivateMessages", {
      userId1: user.id,
      userId2: userId,
    });
  };

  const sendMessage = () => {
    if (message.trim().length > 0) {
      socket.emit("chatroomMessage", {
        chatId: userId,
        message,
      });
      setMessage("");
    }
  };

  return (
    <div>
      <button onClick={startPrivateMessages}>Message</button>
      <div>
        {messages.map((messageObj, index) => (
          <div key={index}>
            <span>{messageObj.name}: </span>
            {messageObj.message}
          </div>
        ))}
      </div>
      <div>
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
