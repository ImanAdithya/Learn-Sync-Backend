const mongoose = require('mongoose');

const groupChatSchema = new mongoose.Schema({
  groupId: { type: mongoose.Schema.Types.ObjectId, auto: true }, 
  name: { type: String, required: true },
  time: { type: Date, default: Date.now },
  createUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

const GroupChat = mongoose.model('GroupChat', groupChatSchema);

module.exports = GroupChat;
