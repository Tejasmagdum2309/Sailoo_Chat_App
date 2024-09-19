import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
    {
        roomid: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        currentUsers: {
            type: Number,
            default: 0, // Track current users in the room
        },
    },
    {
        timestamps: true,
    }
);

const Room = mongoose.model("Room", roomSchema);
export default Room;