import React from "react";
import { Button, Card, CardBody, CardHeader, Flex } from "@chakra-ui/react";

const ChatroomPage = () => {
  return (
    <div>
      <div>test</div>
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
                  />
                </div>
              </Flex>
              <Button>Create Public Group</Button>
              <Flex justifyContent="space-between">
                <div className="chatrooms">
                  <div>New Chat</div>
                  <div className="join">Join</div>
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
