import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import logo from "../../images/logo.png"; 
import WeatherApi from "../adminSide/WeatherApi"
import GrabData from "..//adminSide/GrabData";


function PublicHeader() {
  const [menuOpen, setMenuOpen] = useState(false); 

    return (
        <div className="flex flex-col z-50 sticky top-0  ">
        <div className='flex flex-row bg-gradient-to-r  from-[#022944] to-[#034f84] text-white justify-between items-center px-4 xl:px-20 p-2 '>
          
        <div className="flex  xl:items-center gap-4 ">
          <img src={logo} alt="logo" className="xl:w-20 w-14" />
          <div className="text-lg xl:text-xl hidden xl:block">AiRizz</div></div>
        <div className=''>
        <div className="text-sm xl:text-2xl font-semibold text-center xl:block hidden ">Air Quality Monitoring</div></div>
        <div className=''><WeatherApi /></div>
        </div>


        <div className="flex justify-start gap-4  xl:px-20 px-8 flex-row items-center shadow-md z-10 mt-8 p-4">
            <Link
            to="/DataMonitoring"
            className="xl:py-2 xl:px-6 py-1 px-4 
              xl:text-base text-sm rounded-full bg-violet-500 text-white font-semibold hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-300 shadow-md transition-all">
            More
            </Link>
            <GrabData />
        </div>

        </div>
    );
}

export default PublicHeader;
