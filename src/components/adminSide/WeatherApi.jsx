import React, { useState, useEffect } from "react";
import axios from "axios";

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId); 
  }, []);

  useEffect(() => {
    const fetchWeather = async (latitude, longitude) => {
      const apiKey = "9db3ba4b90cda7d0b0956d33b97b929c"; 
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather`,
          {
            params: {
              lat: latitude,
              lon: longitude,
              units: "metric",
              appid: apiKey,
            },
          }
        );
        setWeather(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching the weather data", error);
        setError(error.message);
        setLoading(false);
      }
    };

    // Fixed latitude and longitude for Batangas City
    const latitude = 13.7559;
    const longitude = 121.0597;
    fetchWeather(latitude, longitude);
  }, []);

  if (loading) return <div>Loading weather...</div>;
  if (error) return <div>Error: {error}</div>;

  const weatherIconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
  const formattedTime = currentTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  const formattedDate = currentTime.toLocaleDateString('en-GB'); 

  return (
    <div className="flex justify-between items-center text-slate-100  rounded-md xl:gap-4 gap-2  px-2 ">

      <div className="flex items-center flex-col">
        <div className="xl:text-sm text-xs">{weather.main.temp}°C</div>
        <div className="">
          <img src={weatherIconUrl} alt="Weather Icon" className="xl:w-10 w-7" />
        </div>
      </div>

      <div>
        <div className="">{weather.name}</div>
        <div className="xl:text-sm text-xs">
          {weather.sys.country}
        </div>
      </div>

      <div className="border-l-2 border-blue-500 xl:h-12 h-8"></div>

      <div className="text-right">
        <div className="xl:text-sm text-xs ">{formattedTime}</div>
        <div className="xl:text-sm text-xs">{formattedDate}</div>
      </div>

    </div>
  );
};

export default WeatherWidget;
