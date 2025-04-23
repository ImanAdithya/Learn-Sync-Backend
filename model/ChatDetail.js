const mongoose = require('mongoose');

const chatDetailSchema = new mongoose.Schema({
  chatDetailId: { type: mongoose.Schema.Types.ObjectId, auto: true }, 
  groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'GroupChat', required: true },
  sendUser: { type: String, required: true },
  message: { type: String, required: true },
  time: { type: Date, default: Date.now },
}, { timestamps: true });

const ChatDetail = mongoose.model('ChatDetail', chatDetailSchema);

module.exports = ChatDetail;
