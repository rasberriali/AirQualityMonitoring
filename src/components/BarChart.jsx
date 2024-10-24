import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChart = () => {
  const [co2, setCO2] = useState(0);
  const [pm1, setPM1] = useState(0);
  const [pm25, setPM25] = useState(0);
  const [pm10, setPM10] = useState(0);

  useEffect(() =>{
    const fetchData = async() => {
      try {
        const response = await fetch('https://7mbe947lp3.execute-api.ap-southeast-2.amazonaws.com/AiRizzFunction');
        const data = await response.json();

        if (data.length > 0) {
          const sortedData = data.sort((a, b) => parseInt(b.TS.N) - parseInt(a.TS.N));
          const latestData = sortedData[0];

          setCO2(parseInt(latestData.CO2_MQ135.N) || 0);
          setPM1(parseInt( latestData.PM1_0.N) || 0);
          setPM25(parseInt(latestData.PM2_5.N) || 0);
          setPM10(parseInt(latestData.PM10.N) || 0);
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const data = {
    labels: ["CO2", "PM1.0", "PM2.5", "PM10"],
    datasets: [
      {
        label: "Air Pollutant Levels",
        data: [co2, pm1, pm25, pm10],
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-full p-6 rounded-lg">
      <h3 className="text-lg font-semibold mb-4 text-center text-white">Bar Chart</h3>
      <div className="bg-gray-800 p-4 rounded-lg">
        <Bar data={data} />
      </div>
    </div>
  );
};

export default BarChart;
