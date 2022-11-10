const mongoose = require('mongoose');
const { Schema } = mongoose;

const PostSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    // comments: [{ type: Schema.Types.ObjectId, ref: 'Comment', default: [] }],
    likes: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
    picture: { type: String },
    text: { type: String, minLength: 1, maxLength: 1000, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', PostSchema);
