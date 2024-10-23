import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChart = () => {
  const data = {
    labels: ["CO2", "PM1.0", "PM2.5", "PM10"],
    datasets: [
      {
        label: "Air Pollutant Levels",
        data: [400, 15, 25, 50],
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
