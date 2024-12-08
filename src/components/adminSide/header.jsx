import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import axios from 'axios';
import logo from "../../images/logo.png"; 
import WeatherApi from "../adminSide/WeatherApi";
import GrabData from "./GrabData";
import { useNavigate } from "react-router-dom";

function Header({ scrollToLineChart, scrollToBarChart, scrollToHeatmap, scrollToReadings, scrollToDataTable }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/"); 
  };
  
  return (
 
      <div className="flex flex-col z-50 sticky top-0  ">
        <div className='flex flex-row bg-gradient-to-r from-[#022944] to-[#034f84] text-white justify-between items-center px-4 xl:px-20 p-2 '>
          
        <div className="flex  xl:items-center  gap-4 ">
          <img src={logo} alt="logo" className="xl:w-20 w-14" />
          <div className="text-lg xl:text-xl hidden xl:block">AiRizz</div></div>
        <div className=''>
        <div className="text-sm xl:text-2xl font-semibold text-center xl:block hidden ">Air Quality Monitoring</div></div>
        <div className=''><WeatherApi /></div>
        </div>
    

      <div className='flex flex-row xl:justify-between shadow-md  xl:mt-12 xl:px-20  p-4 '>
            <div className='flex gap-2 '>
              <button onClick={scrollToLineChart} className="xl:block hidden py-2 px-4 rounded-full bg-indigo-500 text-white font-semibold hover:bg-indigo-600 active:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 shadow-md transition-all">
                Line Chart
              </button>
              <button onClick={scrollToBarChart} className="xl:block hidden py-2 px-4 rounded-full bg-teal-500 text-white font-semibold hover:bg-teal-600 active:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-300 shadow-md transition-all">
                Bar Chart
              </button>
              <button onClick={scrollToHeatmap} className="xl:block hidden py-2 px-4 rounded-full bg-sky-500 text-white font-semibold hover:bg-sky-600 active:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-300 shadow-md transition-all">
                Heatmap
              </button>
              <button onClick={scrollToReadings} className="xl:block hidden py-2 px-4 rounded-full bg-amber-500 text-white font-semibold hover:bg-amber-600 active:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-300 shadow-md transition-all">
                Current Readings
              </button>
              <button onClick={scrollToDataTable} className="xl:block hidden py-2 px-4 rounded-full bg-rose-500 text-white font-semibold hover:bg-rose-600 active:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-300 shadow-md transition-all">
                Table Readings
              </button>
            </div>

            <div className='flex justify-end  xl:px-4 px-8 flex-row items-center gap-4'>
              <button onClick={handleClick} className="xl:py-2 xl:px-6 py-1 px-4 
              xl:text-base text-sm rounded-full bg-blue-700 text-white 
              font-semibold hover:bg-blue-600 cursor-pointer active:bg-blue-700
               focus:outline-none focus:ring-2 focus:ring-violet-300 shadow-md transition-all">
              User
            </button>
            <GrabData />
            </div>
              </div>
              </div>

   
  );
}

export default Header;
