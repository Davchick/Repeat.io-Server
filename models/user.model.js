import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    friends: {
      type: Array,
      default: [],
    },
    collections: {
      type: Array,
      default: [],
    },
    avatar: {
      type: String,
      default: "./default-avatar.jpg",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
