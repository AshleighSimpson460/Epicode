export const generatePrivateId = (userId1, userId2) => {
  if (!userId1 || !userId2) {
    throw new Error("Invalid userIds");
  }

  const chatId = `${userId1}-${userId2}`;
  return chatId;
};
