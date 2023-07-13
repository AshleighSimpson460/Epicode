import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Socket } from "socket.io-client";

interface DirectMessageProps {
  socket: Socket;
}

interface Message {
  userId: string;
  name: string;
  message: string;
  timestamp: string;
}

const GroupMessage = ({ socket }: DirectMessageProps) => {
  const { chatId } = useParams<{ chatId: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (socket && message && chatId) {
      socket.emit("chatroomMessage", {
        chatId,
        message,
      });
      console.log(message);
      setMessage("");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("C_Token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUserId(payload.id);
    }
    console.log(socket);
    if (socket) {
      socket.on("newMessage", ({ message, name }: Message | any) => {
        const timestamp = new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        const newMessage: Message = { message, name, userId: "", timestamp };
        const newMessages = [...messages, newMessage];
        setMessages(newMessages);
      });
    }
    return () => {
      if (socket) {
        socket.off("newMessage");
      }
    };
  }, [messages, socket]);

  useEffect(() => {
    console.log(socket);
    if (socket) {
      socket.emit("joinRoom", {
        chatId,
      });
    }

    return () => {
      if (socket) {
        socket.emit("leaveRoom", {
          chatId,
        });
      }
    };
  }, [chatId, socket]);

  return (
    <div className="chatroomPage">
      <div className="chatroomSection">
        <div className="cardHeader">
          <div className="chatroomContent">
            {messages.map((messageObj, index) => (
              <div key={index} className="message">
                <span
                  className={
                    userId === messageObj.userId ? "ownMessage" : "otherMessage"
                  }
                >
                  {messageObj.name} ({messageObj.timestamp})
                </span>{" "}
                {messageObj.message}
              </div>
            ))}
          </div>
          <div className="chatroomActions">
            <div>
              <input
                type="text"
                name="message"
                placeholder="enter message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <div>
              <button className="join" onClick={sendMessage}>
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupMessage;
