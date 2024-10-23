import React from "react";

const DataTable = () => {
  const data = [
    { time: "10:00 AM", CO2: "400 ppm", PM1_0: "15 µg/m³", PM2_5: "25 µg/m³", PM10: "50 µg/m³" },
    // Add more data entries here...
  ];

  return (
    <div className="w-full bg-gray-900 p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4 text-center text-white">Realtime Readings</h3>
      <div className="grid grid-cols-5 gap-4">
        <div className="bg-blue-600 p-2 rounded-lg text-center text-white font-bold">Time</div>
        <div className="bg-green-600 p-2 rounded-lg text-center text-white font-bold">CO2</div>
        <div className="bg-blue-600 p-2 rounded-lg text-center text-white font-bold">PM1.0</div>
        <div className="bg-green-600 p-2 rounded-lg text-center text-white font-bold">PM2.5</div>
        <div className="bg-blue-600 p-2 rounded-lg text-center text-white font-bold">PM10</div>

        {data.map((entry, index) => (
          <React.Fragment key={index}>
            <div className="bg-blue-500 p-2 rounded-lg text-center text-white">{entry.time}</div>
            <div className="bg-green-500 p-2 rounded-lg text-center text-white">{entry.CO2}</div>
            <div className="bg-blue-500 p-2 rounded-lg text-center text-white">{entry.PM1_0}</div>
            <div className="bg-green-500 p-2 rounded-lg text-center text-white">{entry.PM2_5}</div>
            <div className="bg-blue-500 p-2 rounded-lg text-center text-white">{entry.PM10}</div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default DataTable;
