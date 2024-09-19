//creating user model
import mongoose from "mongoose";

// creaing schema
const userSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// creating model
const User = mongoose.model("User", userSchema);
export default User;
