const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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

userSchema.pre('save', async function (next) {
  try {
    if (this.isModified('password')) {
      const salt = await bcrypt.genSalt(10);
      this.password = bcrypt.hash(this.password, salt);
    }
    next();
  } catch (error) {
    return res.status(statusCode.error).json({ error: error.message });
  }
});

module.exports = mongoose.model('User', userSchema);
