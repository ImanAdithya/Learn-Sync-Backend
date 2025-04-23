const ChatDetail = require("../model/ChatDetail");
const GroupChat = require("../model/GroupChat");

const saveChatDetail = async (req, res) => {
  try {
    const { sendUser, message, groupId } = req.body;

    if (!sendUser || !message) {
      return res.status(400).json({ message: "sendUser and message are required." });
    }

    const chatDetail = new ChatDetail({
      sendUser,
      message,
      groupId
    });

    await chatDetail.save();

    res.status(201).json(chatDetail);
  } catch (error) {
    console.error("Error saving chat detail:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};


const getAllMessages = async (req, res) => {
    try {
      const { userId, groupId } = req.params;
  
      if (!userId || !groupId) {
        return res.status(400).json({ message: "userId and groupId are required." });
      }
  
      // Check if user belongs to the group
      const group = await GroupChat.findOne({
        groupId: groupId,
        $or: [{ createUser: userId }, { members: userId }],
      });
  
      if (!group) {
        return res.status(403).json({ message: "User is not a member of this group." });
      }
  
      // Fetch all messages for the group
      const messages = await ChatDetail.find({ groupId }).sort({ time: 1 });
  
      res.status(200).json(messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ message: "Internal Server Error", error });
    }
  };
  module.exports = { saveChatDetail, getAllMessages };
