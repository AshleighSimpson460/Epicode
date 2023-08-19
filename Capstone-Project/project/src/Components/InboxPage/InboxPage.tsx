import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Heading, Text, VStack, Avatar } from "@chakra-ui/react";

interface InboxProps {
  currentUser: { id: string };
}

interface Participant {
  _id: string;
  name: string;
  avatarUrl: string;
}

interface Conversation {
  chatId: string;
  participants: Participant[];
}

const InboxPage = ({ currentUser }: InboxProps) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const token = localStorage.getItem("C_Token");
  const userId = currentUser.id;

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    try {
      const response = await fetch(`http://localhost:3002/inbox/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setConversations(data.conversations);
      } else {
        console.error("Failed to fetch conversations");
      }
    } catch (error) {
      console.error("Error fetching conversations:", error);
    }
  };

  return (
    <Box p={4}>
      <Heading as="h2" size="lg" mb={4}>
        Your Inbox
      </Heading>
      <VStack align="start" spacing={4}>
        {conversations.map((conversation) => {
          const otherParticipant = conversation.participants.find(
            (participant) => participant._id !== userId
          );

          if (otherParticipant) {
            return (
              <Link
                key={conversation.chatId}
                to={`/inbox/${conversation.chatId}`}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  p={2}
                  borderWidth="1px"
                  borderRadius="md"
                  transition="background-color 0.2s"
                  _hover={{ bgColor: "gray.100" }}
                >
                  <Avatar size="md" src={otherParticipant.avatarUrl} />
                  <VStack align="start" spacing={0} ml={3}>
                    <Text fontWeight="bold">{otherParticipant.name}</Text>
                    <Text color="gray.600" fontSize="sm">
                      Last message here...
                    </Text>
                  </VStack>
                </Box>
              </Link>
            );
          }
          return null;
        })}
      </VStack>
    </Box>
  );
};

export default InboxPage;
