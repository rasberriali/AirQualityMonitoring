import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Use for navigation
import logo from "../images/logo.png"; 
import WeatherApi from "./WeatherApi";
import GrabData from "./GrabData";


function PublicHeader() {
  const [menuOpen, setMenuOpen] = useState(false); // State for toggling the menu

    return (
        <div>
        {/* Header Bar */}
        <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-[#022944] to-[#034f84] text-white flex justify-between items-center px-4 md:px-20 shadow-md z-20">
            {/* Logo and Title */}
            <div className="flex items-center gap-4">
            <img src={logo} alt="logo" className="w-20" />
            <div className="text-lg md:text-xl">AiRizz</div>
            <WeatherApi />
            </div>
            
            {/* Weather API Section */}
            <div className="text-lg md:text-2xl font-semibold text-center">Air Quality Monitoring</div>
            
            {/* Hamburger Menu Button */}
            <button
            className="text-white md:hidden block focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            >
            {/* Hamburger Icon */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            </button>
        </div>


        {/* Static Links for Larger Screens */}
        <div className="hidden md:flex items-center space-x-4 fixed top-10 py-4 left-0 right-0 shadow-md z-10 mt-16 px-20">
            <Link
            to="/DataMonitoring"
            className="py-2 px-4 rounded-full bg-violet-500 text-white font-semibold hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-300 shadow-md transition-all">
            More
            </Link>
            <GrabData />
        </div>
        </div>
    );
}

export default PublicHeader;
