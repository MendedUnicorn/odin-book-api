const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    first_name: { type: String, minLength: 2 },
    family_name: { type: String, minLength: 2 },
    username: {
      type: String,
      minLength: 4,
      maxLength: 20,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      minLength: 4,
      maxLength: 50,
      required: true,
      unique: true,
    },
    password: { type: String, minLength: 4, maxLength: 100, required: true },
    friends: [{ type: Schema.Types.ObjectId }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
