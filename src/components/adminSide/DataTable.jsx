import React, { useEffect, useState } from "react";

const DataTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () =>{
      try{
        const response = await fetch('https://7mbe947lp3.execute-api.ap-southeast-2.amazonaws.com/items');
        const data = await response.json();

        if (data.length > 0){
          const sortedData = data.sort((a, b) => b.TS - a.TS);
        const latestReadings = sortedData.slice(0, 10).map((entry) => ({
          time: entry.TimeStamp.trim(),
          CO2: `${entry.CO2_MQ135 || 0} ppm`,
          PM1_0: `${entry.PM1_0 || 0} µg/m³`,
          PM2_5: `${entry.PM2_5 || 0} µg/m³`,
          PM10: `${entry.PM10 || 0} µg/m³`,
        }));

          setData(latestReadings);
        }
      } catch (error){
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 5000);

    return () => clearInterval(intervalId);

  }, [])

  return (
    <div className="w-full bg-gray-900  rounded-lg shadow-lg py-4">
      <h3 className="text-lg font-semibold mb-4 text-center text-white">Realtime Readings</h3>
      <div className="grid grid-cols-5 gap-4 text-sm  ">
        <div className="bg-blue-600 p-2 px-4  rounded-lg flex justify-center items-center text-white font-bold">Time</div>
        <div className="bg-green-600 p-2 rounded-lg  flex justify-center items-center text-white font-bold">CO2</div>
        <div className="bg-blue-600 p-2 rounded-lg flex justify-center items-center  text-white font-bold">PM1.0</div>
        <div className="bg-green-600 p-2 rounded-lg flex justify-center items-center text-white font-bold">PM2.5</div>
        <div className="bg-blue-600 p-2 rounded-lg flex justify-center items-center text-white font-bold">PM10</div>

        {data.map((entry, index) => (
          <React.Fragment key={index}>
            <div className="bg-blue-500 p-2 rounded-lg flex justify-center items-center text-white">{entry.time}</div>
            <div className="bg-green-500 p-2 rounded-lg flex justify-center items-center text-white">{entry.CO2}</div>
            <div className="bg-blue-500 p-2 rounded-lg flex justify-center items-center text-white">{entry.PM1_0}</div>
            <div className="bg-green-500 p-2 rounded-lg flex justify-center items-center text-white">{entry.PM2_5}</div>
            <div className="bg-blue-500 p-2 rounded-lg flex justify-center items-center text-white">{entry.PM10}</div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default DataTable;
