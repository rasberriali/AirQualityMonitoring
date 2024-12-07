import React, { useState, useEffect } from "react";
import Groq from "groq-sdk";


const groq = new Groq({ apiKey: import.meta.env.VITE_GROQ_API_KEY,
    dangerouslyAllowBrowser: true,
    });

    const DynamicAQI = () => {
    const [aqi, setAqi] = useState(null);
    const [description, setDescription] = useState("");
    const [advice, setAdvice] = useState("");
    const [color, setColor] = useState("");

    useEffect(() => {
        const fetchAQIData = async () => {
        try {
            const response = await fetch(
            "https://7mbe947lp3.execute-api.ap-southeast-2.amazonaws.com/new_AiRizz_Function"
            );
            const data = await response.json();

            if (data.length > 0) {
            const sortedData = data.sort(
                (a, b) => parseInt(b.TS.N) - parseInt(a.TS.N)
            );

            const groupedData = {};
            sortedData.forEach((entry) => {
                const date = new Date(entry.TimeStamp.S.trim());
                const hourKey = `${date.getFullYear()}-${
                date.getMonth() + 1
                }-${date.getDate()} ${date.getHours()}:00`;
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

            const latestHour = Object.keys(groupedData)[0];
            const { CO2_MQ135, PM1_0, PM2_5, PM10, count } =
                groupedData[latestHour];

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

            setAqi(aqiValue.toFixed(1));
            evaluateAQI(aqiValue);
            fetchAdvice(aqiValue); // Fetch advice from Groq
            }
        } catch (error) {
            console.error("Error fetching AQI data:", error);
        }
        };

        fetchAQIData();
    }, []);

    const evaluateAQI = (value) => {
        if (value <= 50) {
        setDescription("Good");
        setColor("bg-green-400");
        } else if (value <= 100) {
        setDescription("Moderate");
        setColor("bg-yellow-400");
        } else if (value <= 150) {
        setDescription("Unhealthy for Sensitive Groups");
        setColor("bg-orange-400");
        } else if (value <= 200) {
        setDescription("Unhealthy");
        setColor("bg-red-400");
        } else if (value <= 300) {
        setDescription("Very Unhealthy");
        setColor("bg-purple-400");
        } else {
        setDescription("Hazardous");
        setColor("bg-maroon-400");
        }
    };

    const fetchAdvice = async (aqiValue) => {
        try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [
            {
                role: "user",
                content: `The AQI is ${aqiValue}. Provide brief health advice. Not exceeding 20 words`,
            },
            ],
            model: "llama3-8b-8192", // Use the appropriate model
        });
    
        const result =
            chatCompletion.choices[0]?.message?.content.trim() || "Unable to fetch advice.";
    
        // Limit the result to 20 words
        const shortResult = result.split(' ').slice(0, 20).join(' ') + '...';
        
        setAdvice(shortResult);
        } catch (error) {
        console.error("Error fetching advice:", error);
        setAdvice("Unable to fetch dynamic advice at the moment.");
        }
    };
    

    return (
        <div className="bg-gray-900 p-6 rounded-lg flex items-center space-x-4 shadow-lg">
        <div
            className={`flex items-center justify-center w-45 h-39 rounded-full border-4 ${color}`}
        >
            <span className="text-4xl font-extrabold text-white">
            {aqi || "..."}
            </span>
        </div>
        <div>
            <h2 className="text-2xl font-semibold text-white">
            {description || "Loading..."}
            </h2>
            <p className="text-gray-400 mt-2">
            {advice ||
                "Analyzing data to provide specific advice based on air quality..."}
            </p>
        </div>
        </div>
    );
};

export default DynamicAQI;
