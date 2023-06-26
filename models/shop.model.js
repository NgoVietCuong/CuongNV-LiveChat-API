const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema(
  {
    domain: { type: String, required: true },
    access_token: { type: String, required: true },
    status: { type: Boolean, required: true, default: true },
    script_tag_id: { type: String },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    },
    versionKey: false,
  }
);

const Shop = mongoose.model('Shop', shopSchema);

module.exports = Shop;