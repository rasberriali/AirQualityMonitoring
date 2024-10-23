import React from "react";

const Heatmap = () => {
  const heatmapData = [
    [25, 40, 60, 80, 100],
    [30, 50, 70, 90, 110],
    [20, 35, 55, 75, 95],
    [15, 45, 65, 85, 105],
  ];

  const getColor = (value) => {
    if (value <= 40) return "bg-green-200";  // Good
    if (value <= 70) return "bg-yellow-400"; // Moderate
    if (value <= 90) return "bg-orange-400"; // Unhealthy
    return "bg-red-600";                      // Hazardous
  };

  return (
    <div className="w-full bg-gray-900 p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4 text-center text-white">Air Quality Heatmap</h3>
      <div className="grid grid-cols-5 gap-1 mb-4">
        {heatmapData.map((row, rowIndex) =>
          row.map((value, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`w-16 h-16 ${getColor(value)} flex items-center justify-center`}
            >
              <span className="text-xs text-gray-800 font-bold">{value}</span>
            </div>
          ))
        )}
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
