export const generatePrivateId = (userId1, userId2) => {
  const sortedIds = [userId1, userId2].sort(); // Sort the userIds to ensure consistency
  return sortedIds.join("-"); // Join the sorted userIds with a separator to form the chatId
};
