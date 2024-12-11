import React, { useState, useEffect, useRef } from "react";

const PollutantReadings = () => {
  const [pollutants, setPollutants] = useState([
    { name: "CO2", value: 0, max: 1000 }, 
    { name: "PM2.5", value: 0, max: 100 },
    { name: "PM10", value: 0, max: 100 },
  ]);
  const [isVisible, setIsVisible] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
      }
    );

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => {
      if (textRef.current) {
        observer.unobserve(textRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const fetchLatestData = async () => {
      try {
        const response = await fetch('https://7mbe947lp3.execute-api.ap-southeast-2.amazonaws.com/items');
        const data = await response.json();

        if (data.length > 0) {
          const sortedData = data.sort((a, b) => parseInt(b.TS) - parseInt(a.TS));
          const latestEntry = sortedData[0]; 

          setPollutants([
            { name: "CO2", value: parseInt(latestEntry.CO2_MQ135) || 0, max: 1000 },
            { name: "PM1.0", value: parseInt(latestEntry.PM1_0) || 0, max: 100 },
            { name: "PM2.5", value: parseInt(latestEntry.PM2_5) || 0, max: 100 },
            { name: "PM10", value: parseInt(latestEntry.PM10) || 0, max: 100 },
          ]);
        }
      } catch (error) {
        console.error("Error fetching latest data:", error);
      }
    };

    fetchLatestData();
    const intervalId = setInterval(fetchLatestData, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="w-full bg-gray-900 p-6 rounded-lg">
      <h3 className="text-lg font-semibold mb-4 text-center text-white">Latest Readings per Pollutant</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pollutants.map((pollutant, index) => (
          <div key={index} className="bg-gray-800 p-4 rounded-lg flex flex-col shadow">
            <div className="flex justify-between mb-2">
              <span className="text-white font-semibold">{pollutant.name}</span>
              <span className="text-white">{pollutant.value} {pollutant.name === "CO2" ? "ppm" : "µg/m³"}</span>
            </div>
            <input
              type="range"
              className="slider w-full h-2 rounded-lg appearance-none bg-green-300"
              min="0"
              max={pollutant.max}
              value={pollutant.value}
              readOnly
              style={{
                background: `linear-gradient(to right, rgba(75, 192, 192, 1) 0%, rgba(75, 192, 192, 1) ${(pollutant.value / pollutant.max) * 100}%, rgba(200, 200, 200, 0.5) ${(pollutant.value / pollutant.max) * 100}%, rgba(200, 200, 200, 0.5) 100%)`,
              }}
            />
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center mt-6">
        <div className="h-1 w-3/4 bg-gray-100 rounded-full mb-4"></div>
      <div 
        ref={textRef} 
        className={`text-gray-500 text-center text-base leading-relaxed shadow-md p-4 rounded-lg bg-gray-900 bg-opacity-60 max-w-3xl fade-in ${isVisible ? 'fade-in-visible' : ''}`}
      >
        This section displays the latest readings of key air pollutants, including 
        <span style={{ color: "rgba(75, 192, 192, 1)" }}> CO2,</span> 
        <span style={{ color: "rgba(255, 99, 132, 1)" }}> PM1.0,</span> 
        <span style={{ color: "rgba(54, 162, 235, 1)" }}> PM2.5,</span> 
        and <span style={{ color: "rgba(153, 102, 255, 1)" }}> PM10.</span> 
        The values are shown alongside a slider representing their concentration levels, allowing for a quick visual assessment of air quality.
      </div>
      </div>
    </div>
  );
};

export default PollutantReadings;
