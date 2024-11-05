import React from 'react'
import GrabData from "./GrabData";

function HeroSection() {
  return (
    <div className='flex flex-row px-36 text-xs'>
      <div className='flex flex-row w-full justify-between items-center'>
        <div className='flex justify-start gap-2'>
          <button className="py-2 px-4 rounded-full bg-indigo-500 text-white font-semibold
           hover:bg-indigo-600 active:bg-indigo-700 focus:outline-none focus:ring-4
            focus:ring-indigo-300 shadow-md transition-all">
            Line Chart
          </button>
          <button className="py-2 px-4 rounded-full bg-teal-500 text-white font-semibold
           hover:bg-teal-600 active:bg-teal-700 focus:outline-none focus:ring-4
            focus:ring-teal-300 shadow-md transition-all">
            Bar Chart
          </button>
          <button className="py-2 px-4 rounded-full bg-sky-500 text-white font-semibold
           hover:bg-sky-600 active:bg-sky-700 focus:outline-none focus:ring-4
            focus:ring-sky-300 shadow-md transition-all">
            Heatmap
          </button>
          <button className="py-2 px-4 rounded-full bg-amber-500 text-white font-semibold
           hover:bg-amber-600 active:bg-amber-700 focus:outline-none focus:ring-4
            focus:ring-amber-300 shadow-md transition-all">
            Current Readings
          </button>
          <button className="py-2 px-4 rounded-full bg-rose-500 text-white font-semibold
           hover:bg-rose-600 active:bg-rose-700 focus:outline-none focus:ring-4
            focus:ring-rose-300 shadow-md transition-all">
            Table Readings
          </button>
        </div>

        <div className='flex justify-end'>
          <GrabData/>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
