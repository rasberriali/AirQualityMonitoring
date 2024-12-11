import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const LineChartPublic = () => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: "AQI Levels",
                data: [],
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                fill: true,
                tension: 0.4, // Smooth curves
                pointRadius: 3,
            },
        ],
    });

    const chartOptions = {
        responsive: true, // Ensures it fits the container
        maintainAspectRatio: false, // Allows height to be flexible
        scales: {
            x: {
                ticks: {
                    color: "gray", // Adjust label color for dark mode
                },
                grid: {
                    display: false, // Hide grid lines for x-axis
                },
            },
            y: {
                ticks: {
                    color: "gray", // Adjust label color
                },
                grid: {
                    color: "#101625", // Subtle grid lines
                },
            },
        },
        plugins: {
            legend: {
                display: true,
                labels: {
                    color: "gray",
                },
            },
            tooltip: {
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                titleColor: "gray",
                bodyColor: "gray",
            },
        },
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    "https://7mbe947lp3.execute-api.ap-southeast-2.amazonaws.com/items"
                );
                const data = await response.json();

                if (data.length > 0) {
                    const sortedData = data.sort(
                        (a, b) => parseInt(b.TS) - parseInt(a.TS)
                    );

                    const groupedData = {};
                    sortedData.forEach((entry) => {
                        const date = new Date(entry.TimeStamp.trim());
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

                        groupedData[hourKey].CO2_MQ135 += parseInt(entry.CO2_MQ135) || 0;
                        groupedData[hourKey].PM1_0 += parseInt(entry.PM1_0) || 0;
                        groupedData[hourKey].PM2_5 += parseInt(entry.PM2_5) || 0;
                        groupedData[hourKey].PM10 += parseInt(entry.PM10) || 0;
                        groupedData[hourKey].count += 1;
                    });

                    const timestamps = [];
                    const aqiLevels = [];

                    Object.keys(groupedData).forEach((hour) => {
                        const { CO2_MQ135, PM1_0, PM2_5, PM10, count } = groupedData[hour];
                        const avgCO2 = CO2_MQ135 / count;
                        const avgPM1_0 = PM1_0 / count;
                        const avgPM2_5 = PM2_5 / count;
                        const avgPM10 = PM10 / count;

                        const aqiValue = Math.max(
                            avgCO2 / 500,
                            avgPM1_0 / 35,
                            avgPM2_5 / 25,
                            avgPM10 / 50
                        ) * 100;

                        timestamps.push(hour);
                        aqiLevels.push(aqiValue.toFixed(1));
                    });

                    setChartData({
                        labels: timestamps,
                        datasets: [
                            {
                                label: "AQI Levels",
                                data: aqiLevels,
                                borderColor: "rgba(75, 192, 192, 1)",
                                backgroundColor: "rgba(75, 192, 192, 0.2)",
                                fill: true,
                                tension: 0.4,
                                pointRadius: 3,
                            },
                        ],
                    });
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="relative w-full h-96 bg-[#111827] p-6 rounded-lg">
            <Line data={chartData} options={chartOptions} />
        </div>
    );
};

export default LineChartPublic;
