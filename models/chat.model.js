const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema(
  {
    status: { type: String, required: true, enum: ['Waiting', 'Open', 'Solved'] },
    read: { type: Boolean, default: false },
    last_message: { type: mongoose.Types.ObjectId, ref: 'Message', default: null},
    // belongs to
    shop: { type: mongoose.Types.ObjectId, required: true, ref: 'Shop' },
    visitor: { type: mongoose.Types.ObjectId, required: true, ref: 'Visitor' }
  },
  {
    timestamps: {
      createdAt: false,
      updatedAt: 'updated_at'
    },
    versionKey: false
  }
);

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;