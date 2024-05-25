const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: 'Name is required',
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: 'Email is required',
    },
    password: {
      type: String,
      trim: true,
      required: 'Password is required',
    },
    active: {
      type: Boolean,
      default: true,
    },
    message: [mongoose.types.ObjectId],
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

module.exports = mongoose.model('User', userSchema);
