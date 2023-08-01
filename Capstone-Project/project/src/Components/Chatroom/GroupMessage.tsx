import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Socket } from "socket.io-client";
import { generatePrivateId } from "../utils/generatePrivateId.js";

interface GroupMessageProps {
  socket: Socket;
  setupSocket: () => void;
  currentUser: { id: string; name: string } | null; // Update the type here
}

interface Message {
  userId: string;
  name: string;
  message: string;
  timestamp: string;
}

const GroupMessage = ({
  socket,
  setupSocket,
  currentUser,
}: GroupMessageProps) => {
  const { chatId } = useParams<{ chatId: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const startPrivateMessage = (userId: string) => {
    const privateChatId = generatePrivateId(currentUser?.id, userId); // Access the id property with optional chaining
    const participants = [currentUser?.id, userId]; // Access the id property with optional chaining
    socket.emit("startPrivateMessages", {
      chatId: privateChatId,
      participants,
    });
    navigate(`/inbox/${privateChatId}`);
  };

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
    console.log("currentUser:", currentUser);

    if (socket) {
      socket.on("newMessage", ({ message, name, userId }: Message | any) => {
        const timestamp = new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        const newMessage: Message = { message, name, userId, timestamp };
        const newMessages = [...messages, newMessage];
        setMessages(newMessages);
      });
    }
    return () => {
      if (socket) {
        socket.off("newMessage");
      }
    };
  }, [currentUser, messages, socket]);

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
            {currentUser && currentUser.id ? (
              messages.map((messageObj, index) => (
                <div key={index} className="message">
                  <span
                    className={
                      currentUser.id === messageObj.userId
                        ? "ownMessage"
                        : "otherMessage"
                    }
                  >
                    {/* Make the user's name clickable */}
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => startPrivateMessage(messageObj.userId)}
                    >
                      {messageObj.name}
                    </span>{" "}
                    ({messageObj.timestamp})
                  </span>{" "}
                  {messageObj.message}
                </div>
              ))
            ) : (
              <div>Loading...</div>
            )}
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
