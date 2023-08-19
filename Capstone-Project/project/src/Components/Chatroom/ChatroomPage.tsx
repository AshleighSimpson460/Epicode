import { useEffect, useState } from "react";

import { showError, showToast } from "../Toaster.js";
import {
  Box,
  Button,
  Flex,
  Input,
  Text,
  VStack,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import CreateChatroom from "../Fetch/api.tsx";

interface Chatroom {
  _id: string;
  name: string;
}

const ChatroomPage = () => {
  const [chatrooms, setChatrooms] = useState<Chatroom[]>([]);
  const [newChatroomName, setNewChatroomName] = useState("");

  const { colorMode } = useColorMode();
  const cardBgColor = useColorModeValue("white", "gray.800");
  const cardHeaderBgColor = useColorModeValue("gray.100", "gray.700");
  const textColor = useColorModeValue("gray.700", "gray.300");
  const buttonBgColor = useColorModeValue("blue.500", "blue.300");

  const getChatrooms = () => {
    fetch("http://localhost:3002/groupchats", {
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
    <Box h="70vh" display="flex" alignItems="center" justifyContent="center">
      <VStack spacing={6} p={6} borderRadius={10} bg={cardBgColor}>
        <Box bg={cardHeaderBgColor} p={4} borderRadius={10}>
          <Text fontSize="lg" fontWeight="bold">
            Customise Group Name
          </Text>
        </Box>
        <Box>
          <Input
            type="text"
            name="chatroomName"
            placeholder="Create Chat Name"
            value={newChatroomName}
            onChange={(e) => setNewChatroomName(e.target.value)}
          />
        </Box>
        <Button onClick={handleCreateChatroom} bg={buttonBgColor} color="white">
          Create Public Groupchat
        </Button>
        <Box w="100%">
          {chatrooms.length > 0 ? (
            chatrooms.map((chatroom) => (
              <Flex
                key={chatroom._id}
                justifyContent="space-between"
                alignItems="center"
                bg={cardBgColor}
                p={4}
                borderRadius={8}
                boxShadow="md"
                mt={4}
              >
                <Text color={textColor}>{chatroom.name}</Text>
                <Link to={"/groupchats/" + chatroom._id}>
                  <Button colorScheme={colorMode === "light" ? "blue" : "teal"}>
                    Join
                  </Button>
                </Link>
              </Flex>
            ))
          ) : (
            <Text>No chatrooms available</Text>
          )}
        </Box>
      </VStack>
    </Box>
  );
};

export default ChatroomPage;
