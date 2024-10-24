import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import axios from 'axios';
import logo from "../images/logo.png"; 
import WeatherApi from "./WeatherApi";
import GrabData from "./GrabData";

function Header({ scrollToLineChart, scrollToBarChart, scrollToHeatmap, scrollToReadings, scrollToDataTable }) {
  return (
    <div>
      
      <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-[#022944] to-[#034f84] text-white flex flex-col md:flex-row justify-between items-center px-4 md:px-20 shadow-md z-20">
    <div className="flex items-center gap-4">
        <img src={logo} alt="logo" className="w-20" />
        <div className="text-lg md:text-xl">AiRizz</div>
    </div>
    <div className="text-lg md:text-2xl font-semibold text-center">Air Quality Monitoring</div>
    <WeatherApi />
</div>


      <div className='fixed top-10 py-4 left-0 right-0 shadow-md z-10 mt-16'>
      <div className='hidden md:flex flex-row px-36 text-xs'>
          <div className='flex flex-row w-full justify-between items-center'>
            <div className='flex justify-start gap-2'>
              <button onClick={scrollToLineChart} className="py-2 px-4 rounded-full bg-indigo-500 text-white font-semibold hover:bg-indigo-600 active:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 shadow-md transition-all">
                Line Chart
              </button>
              <button onClick={scrollToBarChart} className="py-2 px-4 rounded-full bg-teal-500 text-white font-semibold hover:bg-teal-600 active:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-300 shadow-md transition-all">
                Bar Chart
              </button>
              <button onClick={scrollToHeatmap} className="py-2 px-4 rounded-full bg-sky-500 text-white font-semibold hover:bg-sky-600 active:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-300 shadow-md transition-all">
                Heatmap
              </button>
              <button onClick={scrollToReadings} className="py-2 px-4 rounded-full bg-amber-500 text-white font-semibold hover:bg-amber-600 active:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-300 shadow-md transition-all">
                Current Readings
              </button>
              <button onClick={scrollToDataTable} className="py-2 px-4 rounded-full bg-rose-500 text-white font-semibold hover:bg-rose-600 active:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-300 shadow-md transition-all">
                Table Readings
              </button>
            </div>

            <div className='flex justify-end'>
              <GrabData />
            </div>
          </div>
        </div>
      </div>
      
      <div style={{ marginTop: '160px' }}></div> {/* Adjust the margin-top as needed */}
    </div>
  );
}

export default Header;
