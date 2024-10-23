import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const LineChart = () => {
  const data = {
    labels: ["1 AM", "2 AM", "3 AM", "4 AM", "5 AM"],
    datasets: [
      {
        label: "CO2 Levels",
        data: [400, 450, 480, 500, 520],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
      {
        label: "PM1.0 Levels",
        data: [15, 20, 22, 18, 16],
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
      },
      {
        label: "PM2.5 Levels",
        data: [25, 28, 30, 27, 25],
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
      },
      {
        label: "PM10 Levels",
        data: [50, 52, 48, 55, 53],
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
      },
    ],
  };

  return (
    <div className="w-full p-6 rounded-lg">
      <h3 className="text-lg font-semibold mb-4 text-center text-white">Time Series Line Chart</h3>
      <div className="bg-gray-800 p-4 rounded-lg">
        <Line data={data} height={200} /> 
      </div>
    </div>
  );
};

export default LineChart;
