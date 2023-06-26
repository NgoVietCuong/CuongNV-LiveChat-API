const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    message: { type: String, required: true },
    type: { type: String, required: true },
    // belongs to
    chat: { type: mongoose.Types.ObjectId, required: true, ref: 'Chat' }
  },
  {
    timestamps: {
      createdAt: 'created_at'
    },
    versionKey: false
  }
);

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;