
import User from "../model/user.model.js";

const loginuser = async (req, res) => { 
    const { clerkid,name,email } = req.body;

    if (!clerkid || !name || !email) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const existingUser = await User.findOne({ email: email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const user = await User.create({
            clerkId: clerkid,
            name: name,
            email: email
        });

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }   
};  
export {loginuser}