const CreateChatroom = (name) => {
  return fetch("http://localhost:3002/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("C_Token"),
    },
    body: JSON.stringify({ name }),
  })
    .then((res) => {
      if (res.status === 401) {
        throw new Error("Unauthorized");
      } else {
        return res.json();
      }
    })
    .catch((err) => {
      throw new Error("Failed to create chatroom");
    });
};

export default CreateChatroom;
