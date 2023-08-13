const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema(
  {
    status: { type: String, required: true, enum: ['Draft', 'Waiting', 'Open', 'Closed', 'Deleted'] },
    read: { type: Boolean, default: false },
    last_message: { type: mongoose.Schema.Types.Mixed, default: null},
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

chatSchema.index({ shop: 1 });

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;