import React, { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Socket } from "socket.io-client";
import { generatePrivateId } from "../utils/generatePrivateId.js";

interface GroupMessageProps {
  socket: Socket;
  setupSocket: () => void;
  currentUser: { id: string; name: string };
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
  const [localCurrentUser, setLocalCurrentUser] = useState<{
    id: string;
    name: string;
  }>({ id: "", name: "" });
  const [clickedUserId, setClickedUserId] = useState<string | null>(null);

  const handleUserNameClick = (userId: string) => {
    setClickedUserId(userId);
  };

  const navigate = useNavigate();

  const prevClickedUserId = useRef<string | null>(null);

  const startPrivateMessage = useCallback(() => {
    console.log("currentuser.id:", currentUser.id);
    console.log("userId:", clickedUserId);
    const token = localStorage.getItem("C_Token");

    if (currentUser && clickedUserId) {
      const participants = [currentUser.id, clickedUserId];
      participants.sort();

      const chatId = generatePrivateId(participants[0], participants[1]);

      socket.emit("startPrivateMessages", {
        chatId: chatId,
        participants: participants,
      });

      fetch(`http://localhost:3002/inbox/${chatId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ participants }),
      })
        .then((response) => response.json())
        .then((data) => {
          const { chatId } = data;
          navigate(`/inbox/${chatId}`);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [currentUser, clickedUserId, socket, navigate]);

  useEffect(() => {
    if (clickedUserId && prevClickedUserId.current !== clickedUserId) {
      startPrivateMessage();
      prevClickedUserId.current = clickedUserId;
    }
  }, [clickedUserId, startPrivateMessage]);

  const sendMessage = useCallback(() => {
    if (socket && message && chatId) {
      socket.emit("chatroomMessage", {
        chatId,
        message,
      });
      console.log(message);
      setMessage("");
    }
  }, [socket, message, chatId]);

  useEffect(() => {
    console.log("currentUser:", currentUser);

    const token = localStorage.getItem("C_Token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setLocalCurrentUser({ id: payload.id, name: payload.name });
    }

    console.log(socket);

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
            {messages.map((messageObj, index) => {
              console.log("userId:", messageObj.userId);
              return (
                <div key={index} className="message">
                  <span
                    className={
                      localCurrentUser.id === messageObj.userId
                        ? "ownMessage"
                        : "otherMessage"
                    }
                  >
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => handleUserNameClick(messageObj.userId)}
                    >
                      {messageObj.name}
                    </span>{" "}
                    ({messageObj.timestamp})
                  </span>{" "}
                  {messageObj.message}
                </div>
              );
            })}
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
