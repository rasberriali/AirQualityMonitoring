import React, { useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BarChart from "./Components/BarChart";
import DataTable from "./Components/DataTable";
import Header from "./components/Header";
import Heatmap from "./components/Heatmap";
import LineChart from "./components/LineChart";
import PollutantReadings from "./components/PollutantReadings";
import Weather from "./components/Weather";
import GrabData from "./components/GrabData";
import WeatherApi from "./components/WeatherApi";
import HeroSection from "./components/HeroSection";

function App() {
  const lineChartRef = useRef(null);
  const barChartRef = useRef(null);
  const heatmapRef = useRef(null);
  const readingsRef = useRef(null);
  const dataTableRef = useRef(null);

  const scrollToRef = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Router>
      <div className="bg-[#001D31] min-h-screen flex flex-col">
        <Header 
          scrollToLineChart={() => scrollToRef(lineChartRef)} 
          scrollToBarChart={() => scrollToRef(barChartRef)} 
          scrollToHeatmap={() => scrollToRef(heatmapRef)} 
          scrollToReadings={() => scrollToRef(readingsRef)} 
          scrollToDataTable={() => scrollToRef(dataTableRef)} 
        />
        
        <div className="flex-grow container mx-auto p-4 mt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            <div className="p-6 bg-gray-900 rounded-lg shadow-lg flex flex-col items-center" ref={lineChartRef}>
              <LineChart />
            </div>
            <div className="p-6 bg-gray-900 rounded-lg shadow-lg flex flex-col items-center" ref={barChartRef}>
              <BarChart />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="p-6 bg-gray-900 rounded-lg shadow-lg" ref={heatmapRef}>
              <Heatmap />
            </div>
            <div className="p-6 bg-gray-900 rounded-lg shadow-lg" ref={readingsRef}>
              <PollutantReadings />
            </div>
          </div>

          <div className="mt-6 p-6 bg-gray-900 rounded-lg shadow-lg" ref={dataTableRef}>
            <DataTable />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
