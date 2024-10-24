import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = () => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
                exclude: "minutely,hourly,alerts",
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

        navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            fetchWeather(latitude, longitude);
        },
        (err) => {
            console.error("Error getting location", err);
            setError("Unable to fetch location.");
            setLoading(false);
        }
        );
    }, []);

    if (loading) return <div>Loading weather...</div>;
    if (error) return <div>Error: {error}</div>;

    const weatherIconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

    return (
        <div className="weather-widget p-6 bg-gray-800 rounded-lg shadow-lg text-white max-w-xs">
        <div className="flex justify-between items-center">
            <div>
            <h2 className="text-2xl font-bold">Current Weather</h2>
            <p className="text-lg">{weather.name}</p>
            </div>
            <div className="text-4xl">
            <span>{weather.main.temp}°C</span>
            </div>
        </div>
        <div className="flex justify-between items-center mt-4">
            <p className="text-lg capitalize">{weather.weather[0].description}</p>
            <div className="weather-icon">
            <img src={weatherIconUrl} alt="Weather Icon" className="w-16" />
            </div>
        </div>
        </div>
    );
    };

export default Weather;
