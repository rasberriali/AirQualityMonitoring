import React, { useEffect, useState, useRef } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChart = () => {
  const [co2, setCO2] = useState(0);
  const [pm1, setPM1] = useState(0);
  const [pm25, setPM25] = useState(0);
  const [pm10, setPM10] = useState(0);
  const [chartData, setChartData] = useState({
    labels: ["CO2", "PM1.0", "PM2.5", "PM10"],
    datasets: [
      {
        label: "Air Pollutant Levels",
        data: [],
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
  });

  const [isVisible, setIsVisible] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://7mbe947lp3.execute-api.ap-southeast-2.amazonaws.com/items');
        const data = await response.json();

        if (data.length > 0) {
          const sortedData = data.sort((a, b) => parseInt(b.TS) - parseInt(a.TS));
          const latestData = sortedData[0];
          setCO2(parseInt(latestData.CO2_MQ135) || 0);
          setPM1(parseInt(latestData.PM1_0) || 0);
          setPM25(parseInt(latestData.PM2_5) || 0);
          setPM10(parseInt(latestData.PM10) || 0);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 5000);
    return () => clearInterval(intervalId);
  }, []);

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
    const fetchData = async () => {
      try {
        const response = await fetch('https://7mbe947lp3.execute-api.ap-southeast-2.amazonaws.com/items');
        const data = await response.json();

        if (data.length > 0) {
          const sortedData = data.sort((a, b) => b.TS - a.TS); 
          const latestData = sortedData[0];
          const airQualityData = [
            latestData.CO2_MQ135 || 0,
            latestData.PM1_0 || 0,
            latestData.PM2_5 || 0,
            latestData.PM10 || 0,
          ];

          setChartData((prevState) => ({
            ...prevState,
            datasets: [
              {
                ...prevState.datasets[0],
                data: airQualityData,
              },
            ],
          }));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="w-full p-6 rounded-lg">
      <h3 className="text-lg font-semibold mb-4 text-center text-white">Air Quality Bar Chart</h3>
      <div className="bg-gray-800 p-4 rounded-lg">
        <Bar data={chartData} height={200} />
      </div>
      <div className="flex flex-col items-center mt-6">
        <div className="h-1 w-3/4 bg-gray-100 rounded-full mb-4"></div>
        
        <div 
          ref={textRef} 
          className={`text-gray-500 text-center text-base leading-relaxed shadow-md p-4 rounded-lg bg-gray-900 bg-opacity-60 max-w-3xl fade-in ${isVisible ? 'fade-in-visible' : ''}`}
        >
          This bar chart provides a visual representation of the current levels of key air pollutants, including 
          <span style={{ color: "rgba(75, 192, 192, 1)" }}> CO2,</span> 
          <span style={{ color: "rgba(255, 99, 132, 1)" }}> PM1.0,</span> 
          <span style={{ color: "rgba(54, 162, 235, 1)" }}> PM2.5,</span> 
          and <span style={{ color: "rgba(153, 102, 255, 1)" }}> PM10.</span> Each bar represents the most recent concentrations, allowing for quick comparisons and monitoring of air quality.
        </div>
      </div>
    </div>
  );
};

export default BarChart;
