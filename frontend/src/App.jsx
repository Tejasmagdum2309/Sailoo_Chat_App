
import {BrowserRouter as Router,Routes,Route, useNavigate} from 'react-router-dom'
import { SignedIn, SignedOut, UserButton, SignInButton, SignUpButton,useUser, useAuth, SignIn, SignUp } from '@clerk/clerk-react';
import { useEffect } from 'react';

import Navbar from "./components/Navbar.jsx";
import Conn from "./pages/Conn.jsx";
import Home from "./pages/Home.jsx";

function ProtectedRoute({children}) {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("inside useeffecgt ; ",isSignedIn)
    if (!isSignedIn) {
      navigate('/signin'); // Redirect to /signin if not signed in
    }
  }, [isSignedIn, navigate]);

  return isSignedIn ? children : null; // Render component if signed in, otherwise return null
}
function App() {
  return (
    <Router>
    <Navbar />
    <div className="bg-gray-900 text-white min-h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
       <Route path="/connect/:id" element={<Conn />} />
       <Route path="/signin" element={<div className="flex items-center justify-center min-h-screen">
      <SignIn />
    </div>} />
      <Route path="/signup" element={<div className="flex items-center justify-center min-h-screen"><SignUp /></div>} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
