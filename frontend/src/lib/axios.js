import axios from "axios";
console.log("hoo");
const axiosInstance = axios.create({
	baseURL: "http://localhost:3000/api", // Point to backend server
	withCredentials: true, // This allows cookies or credentials to be sent
  });

export default axiosInstance;
