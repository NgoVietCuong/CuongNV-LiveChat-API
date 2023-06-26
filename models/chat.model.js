const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    active: { type: String, required: true },
    // belongs to
    shop: { type: mongoose.Types.ObjectId, required: true, ref: 'Shop' },
    visitor: { type: mongoose.Types.ObjectId, required: true, ref: 'Visitor' }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    },
    versionKey: false
  }
);

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;