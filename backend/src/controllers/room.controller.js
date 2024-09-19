
import Room from "../model/room.model.js";

const createroomid = async (req, res) => {
    console.log("inside createroomid")
    const { roomname } = req.body;

    if (!roomname) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // creaet a unique room id using email
        const roomid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        console.log("roomid created : ", roomid); 
        const newRoom = await Room.create({
            roomid: roomid,
            name: roomname,
            currentUsers: 0
        });

        console.log("newRoom : ", newRoom);

        res.status(200).json(newRoom);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }   
}

const destroyroom = async (req, res) => {
    const { roomid } = req.body;

    if (!roomid) {
        return res.status(400).json({ message: "All fields are required" });
    }   

    try {
        const deletedRoom = await Room.findOneAndDelete({ roomid: roomid });
        res.status(200).json(deletedRoom);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const findroom =  async (req, res) => {
    const { roomid } = req.body;
    console.log("inside find roomid : ", roomid);
    // Find the room based on the roomid
    const room =await Room.findOne({ roomid: roomid });
    
    if (room) {
      res.status(200).json(room);
    } else {
      res.status(404).json({ message: 'Room not found' });
    }
  };
        


export {
    createroomid,
    destroyroom,
    findroom,
}