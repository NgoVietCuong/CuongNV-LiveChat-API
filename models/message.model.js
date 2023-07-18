const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    sender: { type: String, required: true, enum: ['Operator', 'Visitor'] },
    type: { type: String, required: true, enum: ['Text', 'Media', 'File', 'Link'] },
    text: { type: String },
    url: { type: String },
    filename: { type: String },
    // belongs to
    chat: { type: mongoose.Types.ObjectId, required: true, ref: 'Chat' },
    shop: { type: mongoose.Types.ObjectId, required: true, ref: 'Shop' },
    visitor: { type: mongoose.Types.ObjectId, required: true, ref: 'Visitor' }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: false
    },
    versionKey: false
  }
);

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;