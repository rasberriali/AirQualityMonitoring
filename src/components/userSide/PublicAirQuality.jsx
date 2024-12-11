import React, { useState, useEffect } from "react";

const getAirQualityLevel = (value, type) => {
  if (type === "CO2") {
    if (value <= 400) return { level: "Good", color: "bg-green-500", dot: "text-green-500" };
    if (value <= 1000) return { level: "Moderate", color: "bg-yellow-400", dot: "text-yellow-400" };
    if (value <= 2000) return { level: "Unhealthy", color: "bg-orange-500", dot: "text-orange-500" };
    return { level: "Hazardous", color: "bg-red-500", dot: "text-red-500" };
  } else {
    if (value <= 12) return { level: "Good", color: "bg-green-500", dot: "text-green-500" };
    if (value <= 35.4) return { level: "Moderate", color: "bg-yellow-400", dot: "text-yellow-400" };
    if (value <= 55.4) return { level: "Unhealthy", color: "bg-orange-500", dot: "text-orange-500" };
    return { level: "Hazardous", color: "bg-red-500", dot: "text-red-500" };
  }
};

const AirQualityMetrics = () => {
  const [metrics, setMetrics] = useState({
    CO2: 0,
    PM1: 0,
    PM2_5: 0,
    PM10: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://7mbe947lp3.execute-api.ap-southeast-2.amazonaws.com/items"
        );
        const data = await response.json();

        if (data.length > 0) {
          const latestEntry = data[0];
          setMetrics({
            CO2: parseInt(latestEntry.CO2_MQ135) || 0,
            PM1: parseInt(latestEntry.PM1_0) || 0,
            PM2_5: parseInt(latestEntry.PM2_5) || 0,
            PM10: parseInt(latestEntry.PM10) || 0,
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 bg-gray-800 rounded-lg">
      {Object.entries(metrics).map(([key, value]) => {
        const { level, color } = getAirQualityLevel(value, key);
        return (
          <div
            key={key}
            className="flex flex-col items-center bg-gray-900 rounded-lg shadow-md p-4"
          >
            {/* Circular Display */}
            <div
              className={`relative w-20 h-20 flex items-center justify-center rounded-lg border-4 ${color}`}
            >
              <span className="text-xl font-bold text-white">{value}</span>
            </div>

            {/* Metric Label */}
            <h3 className="mt-4 text-sm font-semibold text-white uppercase">{key}</h3>
            <p className="text-xs text-gray-400">(μg/m³)</p>

            {/* Air Quality Level */}
            <p
              className={`mt-2 text-sm font-medium ${color === "bg-red-500" ? "text-red-400" : "text-gray-300"}`}
            >
              {level}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default AirQualityMetrics;
