import React, { useState, useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const LineChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "CO2 Levels",
        data: [],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
      {
        label: "PM1.0 Levels",
        data: [],
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
      },
      {
        label: "PM2.5 Levels",
        data: [],
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
      },
      {
        label: "PM10 Levels",
        data: [],
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
      },
    ],
  });

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
    const fetchData = async () => {
      try {
        const response = await fetch('https://7mbe947lp3.execute-api.ap-southeast-2.amazonaws.com/new_AiRizz_Function');
        const data = await response.json();

        if (data.length > 0) {
          const sortedData = data.sort((a, b) => parseInt(b.TS.N) - parseInt(a.TS.N));

          const groupedData = {};
          sortedData.forEach((entry) => {
            const date = new Date(entry.TimeStamp.S.trim());
            const hourKey = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:00`;

            if (!groupedData[hourKey]) {
              groupedData[hourKey] = {
                CO2_MQ135: 0,
                PM1_0: 0,
                PM2_5: 0,
                PM10: 0,
                count: 0,
              };
            }

            groupedData[hourKey].CO2_MQ135 += parseInt(entry.CO2_MQ135.N) || 0;
            groupedData[hourKey].PM1_0 += parseInt(entry.PM1_0.N) || 0;
            groupedData[hourKey].PM2_5 += parseInt(entry.PM2_5.N) || 0;
            groupedData[hourKey].PM10 += parseInt(entry.PM10.N) || 0;
            groupedData[hourKey].count += 1;
          });

          const timestamps = [];
          const co2Levels = [];
          const pm1_0Levels = [];
          const pm2_5Levels = [];
          const pm10Levels = [];

          Object.keys(groupedData).forEach((hour) => {
            const { CO2_MQ135, PM1_0, PM2_5, PM10, count } = groupedData[hour];

            timestamps.push(hour);
            co2Levels.push(CO2_MQ135 / count);
            pm1_0Levels.push(PM1_0 / count);
            pm2_5Levels.push(PM2_5 / count);
            pm10Levels.push(PM10 / count);
          });

          setChartData({
            labels: timestamps,
            datasets: [
              {
                label: "CO2 ",
                data: co2Levels,
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
              },
              {
                label: "PM1.0 ",
                data: pm1_0Levels,
                borderColor: "rgba(255, 99, 132, 1)",
                backgroundColor: "rgba(255, 99, 132, 0.2)",
              },
              {
                label: "PM2.5 ",
                data: pm2_5Levels,
                borderColor: "rgba(54, 162, 235, 1)",
                backgroundColor: "rgba(54, 162, 235, 0.2)",
              },
              {
                label: "PM10 ",
                data: pm10Levels,
                borderColor: "rgba(153, 102, 255, 1)",
                backgroundColor: "rgba(153, 102, 255, 0.2)",
              },
            ],
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 5000);

    return () => clearInterval(intervalId);
  }, []);

  // Legend customization options
  const options = {
    plugins: {
      legend: {
        position: 'top', // Positions the legend on top
        labels: {
          font: {
            size: 12, // Adjust the font size of the legend
          },
          color: 'gray', // Set the text color of the legend
          boxWidth: 10, // Adjust the size of the legend color box
          boxHeight: 10, // Adjust the height of the legend color box
        },
        align: 'center', // Aligns the legend items in a row (left)
        // Alternatively, use `align: 'center'` if you want to center the legend items
      },
    },
  };

  return (
    <div className="w-full p-6 rounded-lg">
      <h3 className="text-lg font-semibold mb-4 text-center text-white">Time Series Line Chart</h3>
      <div className="bg-gray-800 p-4 rounded-lg">
      <Line data={chartData} options={options} height={200} />
      </div>
      <div className="flex flex-col items-center mt-6">
        <div className="h-1 w-3/4 bg-gray-100 rounded-full mb-4"></div>
        
        <div 
          ref={textRef} 
          className={`text-gray-500 text-center text-base leading-relaxed shadow-md p-4 rounded-lg bg-gray-900 bg-opacity-60 max-w-3xl transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        >
          This dynamic visualization presents real-time air quality data, showcasing the concentrations of key pollutants: 
          <span style={{ color: "rgba(75, 192, 192, 1)" }}> CO2,</span> 
          <span style={{ color: "rgba(255, 99, 132, 1)" }}> PM1.0,</span> 
          <span style={{ color: "rgba(54, 162, 235, 1)" }}> PM2.5,</span> 
          and <span style={{ color: "rgba(153, 102, 255, 1)" }}> PM10.</span> Each line represents the hourly averages, allowing you to monitor trends and fluctuations in air quality effectively.
        </div>
      </div>
    </div>
  );
};

export default LineChart;
