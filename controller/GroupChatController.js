const GroupChat = require('../model/GroupChat');


exports.createGroupChat = async (req, res) => {
  try {
    const { name, createUser, members } = req.body;

    if (!name || !createUser || !Array.isArray(members)) {
      return res.status(400).json({ error: 'Missing required fields or members is not an array' });
    }

    const newGroupChat = new GroupChat({
      name,
      createUser,  
      members,  
    });

    await newGroupChat.save();
    res.status(201).json(newGroupChat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserGroups = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    // Find groups where the user is either the creator or a member
    const groups = await GroupChat.find({
      $or: [{ createUser: userId }, { members: userId }]
    });

    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
