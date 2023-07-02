import React from "react";
import io from "socket.io-client";

const DirectMessage = ({ match }) => {
  const chatroomId = match.params.id;

  const socket = io("http://localhost:3002", {
    query: {
      token: localStorage.getItem("C_Token"),
    },
  });

  return <div>DirectMessage</div>;
};

export default DirectMessage;
