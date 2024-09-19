import React, { useState } from 'react';
import axios from '../lib/axios.js';
import { useUser } from '@clerk/clerk-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Home = () => {
  const [roomId, setRoomId] = useState('');
  const [roomname, setRoomname] = useState('');
  const { user } = useUser();

  // Function to generate a room ID by calling the backend API
  const generateRoomId = async () => {
    try {
      if (roomname.trim() === "" || !roomname) {
        toast.error("Please enter a room name!..", {
          position: "top-center",
          autoClose: 3000, // Closes after 3 seconds
        });
        return;
      }

      if (!user) {
        toast.error("Please sign in first!..", {
          position: "top-center",
          autoClose: 3000, // Closes after 3 seconds
        });
        return;
      }

      const response = await axios.post('/room/create', { roomname });
      setRoomId(response.data.roomid); // Assuming the response contains the roomId
    } catch (error) {
      console.error(error);
      toast.error("We are facing some issues..", {
        position: "top-center",
        autoClose: 3000, // Closes after 3 seconds
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-4">Welcome to Our Chat App</h1>
      <p className="text-lg mb-6 text-center">
        We just started creating an app where people can chat for a short period of time. No data will be stored, and we plan to develop more features. 
        Click below to generate a room link that you can share with your friends to start chatting.
      </p>

      <input
        type="text"
        className="w-50% p-2 border border-gray-600 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
        placeholder="Enter room name"
        value={roomname}
        onChange={(e) => setRoomname(e.target.value)}
      />

      <button
        onClick={generateRoomId}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Generate Room ID
      </button>

      {roomId && (
        <p className="text-lg mt-4">
          Room Link: <Link to={`/connect/${roomId}`} className="font-mono text-blue-400 hover:underline">
            /connect/{roomId}
          </Link>
        </p>
      )}

      <ToastContainer />
    </div>
  );
};

export default Home;
