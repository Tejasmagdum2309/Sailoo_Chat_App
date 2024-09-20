import React, { useState, useEffect, useMemo } from "react";
import { io } from 'socket.io-client';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from "@clerk/clerk-react";
import axios from "../lib/axios.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import toast CSS

const Conn = () => {
  const navigate = useNavigate();
  const { id: roomid } = useParams(); // Get room ID from URL parameters
  const [message, setMessage] = useState('');
  const [roomdata,setRoomdata] = useState();
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [roomDeleted, setRoomDeleted] = useState(false);
  const socket = useMemo(() => io('https://sailoo-chat-app.onrender.com'), []); // Establish socket connection
  const { user } = useUser(); // Get user data from Clerk
  const [name, setName] = useState('user'); // Set user name from Clerk
  console.log();

  useEffect(()=>{
      setName(user?.fullName || 'user');
  },[name]);
  
  useEffect(() => {
    // Async function inside useEffect
    const fetchRoomData = async () => {
      if (!roomid) {
        // Navigate user to the home page if roomid is not present
        navigate('/');
      } else {
        try {
          console.log('sending room id to api,,, : ',roomid);
          const res = await axios.post(`/room/findroom`,{roomid : roomid});
          console.log(res)
          
          setRoomdata(res.data);
          
          toast.success(`You are in the room ${res.data.name}`, {
            position: "top-center",
            autoClose: 3000,
          });



        } catch (error) {
          console.log(error.response?.data?.message);
          if(error.response?.data?.message === 'Room not found') {
            toast.error("room not found u will be redirected to home page", {
              position: "top-center",
              autoClose: 3000,
            });

            // navigate user to home page after 5 seconds
            setTimeout(() => {
              navigate('/');
            }, 5000);
          }

          else{
            toast.error("Error fetching room. Please try again.", {
            position: "top-center",
            autoClose: 3000,
          });
          }


          
        }
      }
    };

    fetchRoomData();

    // Socket connection setup
    socket.on('connect', () => {
      console.log('Connected to server');
      if (roomid) {
        socket.emit('joinRoom', roomid);
        console.log(`Joined room: ${roomid}`);
      }
    });

    // Listen for incoming messages
    socket.on('message', (msg, name) => {
      setReceivedMessages((prevMessages) => [...prevMessages, `${name}: ${msg}`]);
    });

     socket.on('whojoined', () => {
      console.log("who joined..")
      toast.success("user entered room..", {
        position: "top-center",
        autoClose: 3000,
      });
    })
    
    socket.on('roomDeleted', () => {
      // create toast sending message times up create new room
      toast.info("Rooms time up... You will be redirected to home page", {
        position: "top-center",
        autoClose: 3000,
      })

      setTimeout(() => {
        navigate('/');
      }, 5000);

    })

    // Clean up socket on unmount
    return () => {
      socket.disconnect();
    };
  }, [socket, roomid, navigate]);

  const handleSend = () => {
    if (message.trim() && roomid) {
      socket.emit('sendMessageToRoom', { room: roomid, message, name });
      setMessage(''); // Clear the input after sending
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-8">Chat App</h1>
      
      {roomdata?.name ? <h3 className="text-2xl font-semibold mb-4">Room name : {roomdata?.name}</h3> : ""}
      <div className="w-full max-w-md p-4 bg-gray-800 shadow-md rounded-lg">
        <textarea
          className="w-full p-2 border border-gray-600 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
          placeholder="Type your message..."
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button
          onClick={handleSend}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Send
        </button>

        {roomDeleted && (
          <p className="text-red-500 mb-4">Room has been deleted. Please join another room.</p>
        )}

        <ToastContainer />

        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Messages:</h2>
          <ul className="list-disc pl-5">
            {receivedMessages.map((msg, index) => (
              <li key={index} className="text-gray-300">{msg}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Conn;
