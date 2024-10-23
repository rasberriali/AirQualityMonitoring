import React from "react";
import BarChart from "./Components/BarChart";
import DataTable from "./Components/DataTable";
import Header from "./components/Header";
import Heatmap from "./components/Heatmap";
import LineChart from "./Components/LineChart";
import PollutantReadings from "./Components/PollutantReadings";

function App() {
  return (
    <div className="bg-[#001D31] min-h-screen flex flex-col">
      
      <Header />
      <div className="flex-grow container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        
          <div className="p-6 bg-gray-900 rounded-lg shadow-lg flex flex-col items-center">
            <LineChart />
          </div>
          <div className="p-6 bg-gray-900 rounded-lg shadow-lg flex flex-col items-center">
            <BarChart />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="p-6 bg-gray-900 rounded-lg shadow-lg">
            <Heatmap />
          </div>
          <div className="p-6 bg-gray-900 rounded-lg shadow-lg">
            <PollutantReadings />
          </div>
        </div>

        <div className="mt-6 p-6 bg-gray-900 rounded-lg shadow-lg">
          <DataTable />
        </div>
      </div>
    </div>
  );
}

export default App;
