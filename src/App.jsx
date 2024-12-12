import React, { useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LineChartPublic from "./components/userSide/LineChartPublic";
import PublicHeader from "./components/userSide/PublicHeader";
import DynamicAQI from "./components/userSide/DynamicAQI";
import AirQualityMetrics from "./components/userSide/PublicAirQuality";
import BarChart from "./components/adminSide/BarChart";
import DataTable from "./components/adminSide/DataTable";
import Header from "./components/adminSide/header";
import Heatmap from "./components/adminSide/Heatmap";
import LineChart from "./components/adminSide/LineChart";
import PollutantReadings from "./components/adminSide/PollutantReadings";
import HeroSection from "./components/userSide/HeroSection";


function PublicPage() {
  return (
    <div className="bg-[#001D31] min-h-screen">
      <PublicHeader />
      <HeroSection/>
      <div className="flex flex-col xl:px-72 px-6 ">


      <div className="mt-12 flex xl:flex-row flex-col  items-center justify-between gap-6 ">
        <div className="xl:w-1/2 w-full  ">
        <DynamicAQI /></div>
        <div className="xl:w-1/2 w-full "><LineChartPublic /></div>
        </div>
              <div className="mt-6 mb-12">
          
        <AirQualityMetrics /></div>
        </div>


   </div>
  );
}

function DataMonitoringPage() {
  const lineChartRef = useRef(null);
  const barChartRef = useRef(null);
  const heatmapRef = useRef(null);
  const readingsRef = useRef(null);
  const dataTableRef = useRef(null);

  const scrollToRef = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-[#001D31] min-h-screen flex flex-col">
      <Header
        scrollToLineChart={() => scrollToRef(lineChartRef)}
        scrollToBarChart={() => scrollToRef(barChartRef)}
        scrollToHeatmap={() => scrollToRef(heatmapRef)}
        scrollToReadings={() => scrollToRef(readingsRef)}
        scrollToDataTable={() => scrollToRef(dataTableRef)}
      />
      <div className="flex-grow container mx-auto xl:p-4 p-6 xl:mt-32 mt-20  ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          <div className="px-6 bg-gray-900 rounded-lg shadow-lg flex flex-col items-center" ref={lineChartRef}>
            <LineChart />
          </div>
          <div className="px-6 bg-gray-900 rounded-lg shadow-lg flex flex-col items-center" ref={barChartRef}>
            <BarChart />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="px-6 bg-gray-900 rounded-lg shadow-lg" ref={heatmapRef}>
            <Heatmap />
          </div>
          <div className="px-6 bg-gray-900 rounded-lg shadow-lg" ref={readingsRef}>
            <PollutantReadings />
          </div>
        </div>

        <div className="mt-6 px-6 bg-gray-900 rounded-lg shadow-lg" ref={dataTableRef}>
          <DataTable />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublicPage />} />
        <Route path="/DataMonitoring" element={<DataMonitoringPage />} />
      </Routes>
    </Router>
  );
}

export default App;
