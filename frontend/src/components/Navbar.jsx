import React, { useState } from 'react';
import { SignedIn, SignedOut, UserButton, SignInButton, SignUpButton,useUser } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  // State to control the mobile menu
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();
  console.log(user);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          <Link to="/">Sailoo</Link>
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="block lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-300 hover:text-white focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>

        {/* Links for desktop */}
        <div className="hidden lg:flex items-center space-x-6">
          <Link to="/" className="text-white hover:text-gray-300">
            Home
          </Link>
           {user ? <Link to="/connect" className="text-white hover:text-gray-300">
            Connect
          </Link> : ""}

          {/* Show UserButton when signed in */}
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>

          {/* Show Sign-in/Sign-up buttons when signed out */}
          <SignedOut>
            <SignInButton>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton>
              <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden ${isOpen ? "block" : "hidden"} bg-gray-700  text-right pr-4`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            to="/"
            onClick={toggleMenu}
            className="block text-white hover:bg-gray-600 px-3 py-2 rounded-md"
          >
            Home
          </Link>
           {user ? <Link
            to="/connect"
            onClick={toggleMenu}
            className="block text-white hover:bg-gray-600 px-3 py-2 rounded-md"
          >
            Connect
          </Link> : ""}

          {/* Show UserButton when signed in */}
          <SignedIn>
            <div className="px-3 py-2">
              <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>

          {/* Show Sign-in/Sign-up buttons when signed out */}
          <SignedOut>
            <div className="px-3 py-2">
              <SignInButton>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-md">
                  Sign In
                </button>
              </SignInButton>
            </div>
            <div className="px-3 py-2">
              <SignUpButton>
                <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-md">
                  Sign Up
                </button>
              </SignUpButton>
            </div>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
