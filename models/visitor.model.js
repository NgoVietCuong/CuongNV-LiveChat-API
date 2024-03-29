const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema(
  {
    key: { type: String, required: true },
    name: { type: String, required: true, default: "" },
    email: { type: String, required: true, default: "" },
    type: { type: String, required: true },
    avatar: { type: String },
    location: { type: String },
    country: { type: String },
    browser: { type: String },
    os: { type: String },
    device: { type: String },
    active: { type: Boolean, default: true },
    ips: { type: [String] },
    in_contact: { type: Boolean, default: false },
    // belongs to
    shop: { type: mongoose.Types.ObjectId, require: true, ref: 'Shop' }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    },
    versionKey: false,
  }
);

visitorSchema.index({ shop: 1 });

const Visitor = mongoose.model('Visitor', visitorSchema);

module.exports = Visitor;