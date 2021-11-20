import mongoose from "mongoose";

const MessageSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  message: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  answered: {
    type: Boolean,
    default: false,
  },
});

const Message = mongoose.model("Message", MessageSchema);

export default Message;
