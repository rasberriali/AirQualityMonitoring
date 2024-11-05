import React, { useState, useEffect } from "react";

const Heatmap = () => {
  const [heatmapData, setHeatmapData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://7mbe947lp3.execute-api.ap-southeast-2.amazonaws.com/new_AiRizz_Function");
        const responseData = await response.json();

        if (responseData.length > 0) {

          const sortedData = responseData.sort((a, b) => parseInt(b.TS.N) - parseInt(a.TS.N));

          const latestReadings = sortedData.slice(0, 4).map((entry) => ({
            co2: parseInt(entry.CO2_MQ135.N) || 0,
            pm1: parseInt(entry.PM1_0.N) || 0,
            pm25: parseInt(entry.PM2_5.N) || 0,
            pm10: parseInt(entry.PM10.N) || 0,
          }));

          setHeatmapData(latestReadings);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 5000); 

    return () => clearInterval(intervalId);
  }, []);

  const getColor = (value) => {
    if (value <= 500) return "bg-green-200";  // Good
    if (value <= 1000) return "bg-yellow-400"; // Moderate
    if (value <= 2000) return "bg-orange-400"; // Unhealthy
    return "bg-red-600";                      // Hazardous
  };

  return (
    <div className="w-full bg-gray-900 p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4 text-center text-white">Air Quality Heatmap</h3>
      <div className="grid grid-cols-4 gap-2 mb-4">
        {heatmapData.map((entry, index) => (
          <React.Fragment key={index}>
            <div className={`w-16 h-16 ${getColor(entry.co2)} flex items-center justify-center`}>
              <span className="text-xs text-gray-800 font-bold">{entry.co2}</span>
            </div>
            <div className={`w-16 h-16 ${getColor(entry.pm1)} flex items-center justify-center`}>
              <span className="text-xs text-gray-800 font-bold">{entry.pm1}</span>
            </div>
            <div className={`w-16 h-16 ${getColor(entry.pm25)} flex items-center justify-center`}>
              <span className="text-xs text-gray-800 font-bold">{entry.pm25}</span>
            </div>
            <div className={`w-16 h-16 ${getColor(entry.pm10)} flex items-center justify-center`}>
              <span className="text-xs text-gray-800 font-bold">{entry.pm10}</span>
            </div>
          </React.Fragment>
        ))}
      </div>
      <div className="flex justify-around text-white">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-200 mr-2"></div>
          <span>Good</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-yellow-400 mr-2"></div>
          <span>Moderate</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-orange-400 mr-2"></div>
          <span>Unhealthy</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-red-600 mr-2"></div>
          <span>Hazardous</span>
        </div>
      </div>
    </div>
  );
};

export default Heatmap;
