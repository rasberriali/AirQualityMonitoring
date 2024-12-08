import React from 'react'

function HeroSection() {
  return (
    <div className='flex flex-col mt-14 xl:px-44   '>
      <div className='flex flex-row xl:text-7xl text-2xl font-bold xl:px-32 px-6  text-white  '>
            Air Quality Monitoring
      </div>
      <div className='w-full  mt-8 xl:text-xl text-sm xl:px-32 px-6 text-[#9D9BB6]'>
        <p>
        The System aims to provide accurate, real-time, and 
        comprehensive air quality information through an interactive and user-friendly
         platform. With various features such as dynamic AQI, visualizations, weather
          updates, and detailed pollutant readings, it offers an essential tool for 
          individuals and organizations to stay informed about air quality and make 
          informed decisions to protect health and the environment.
        </p>
        
      </div>
     
    </div>
  )
}

export default HeroSection
