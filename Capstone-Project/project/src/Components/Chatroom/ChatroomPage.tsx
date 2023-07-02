import React, { useEffect, useState } from "react";

import { showError, showToast } from "../Toaster.js";
import { Button, Card, CardBody, CardHeader, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import CreateChatroom from "../Fetch/api.tsx";

interface Chatroom {
  _id: string;
  name: string;
}

const ChatroomPage = () => {
  const [chatrooms, setChatrooms] = useState<Chatroom[]>([]);
  const [newChatroomName, setNewChatroomName] = useState("");

  const getChatrooms = () => {
    fetch("http://localhost:3002/chat", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("C_Token"),
      },
    })
      .then((res) => {
        if (res.status === 401) {
          showError("error", "Unauthorized");
        }
        return res.json();
      })
      .then((chatData) => {
        console.log(chatData);
        setChatrooms(chatData);
      })
      .catch((err) => {
        setTimeout(getChatrooms, 3000);
      });
  };

  useEffect(() => {
    getChatrooms();
    // eslint-disable-next-line
  }, []);

  const handleCreateChatroom = () => {
    if (newChatroomName.trim() === "") {
      showError("error", "Chatroom name cannot be empty");
    } else {
      showToast("success", "Chatroom successfully created");
    }

    CreateChatroom(newChatroomName)
      .then((createdChatroom: Chatroom) => {
        setChatrooms([...chatrooms, createdChatroom]);
        setNewChatroomName("");
        getChatrooms();
      })
      .catch((err) => {
        showError("error", err.message);
      });
  };

  return (
    <div>
      <Flex h="70vh" alignItems="center" justifyContent="center">
        <Flex flexDirection="column" p={12} borderRadius={10}>
          <Card>
            <CardHeader>Customise Group Name</CardHeader>
            <CardBody>
              <Flex justifyContent="center" flexDirection="column" pb={6}>
                <div className="inputGroup">
                  <input
                    type="text"
                    name="chatroomName"
                    id="chatroomName"
                    placeholder="just chatting"
                    value={newChatroomName}
                    onChange={(e) => setNewChatroomName(e.target.value)}
                  />
                </div>
              </Flex>
              <Button onClick={handleCreateChatroom}>
                Create Public Group
              </Button>
              <Flex justifyContent="space-between">
                <div className="chatrooms">
                  {chatrooms.length > 0 ? (
                    chatrooms.map((chatroom) => (
                      <div key={chatroom._id} className="chatroom">
                        <div>{chatroom.name}</div>
                        <Link to={"/groupchats/" + chatroom._id}>
                          <div className="join">Join</div>
                        </Link>
                      </div>
                    ))
                  ) : (
                    <div key="no-chatrooms">No chatrooms available</div>
                  )}
                </div>
              </Flex>
            </CardBody>
          </Card>
        </Flex>
      </Flex>
    </div>
  );
};

export default ChatroomPage;
