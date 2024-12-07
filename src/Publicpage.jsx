import React from "react";
import LineChartPublic from "./components/LineChartPublic";
import PublicHeader from "./components/PublicHeader";
import DynamicAQI from "./components/DynamicAQI";
import AirQualityMetrics from "./components/PublicAirQuality"; // Import the new component

function PublicPage() {
  return (
    <div className="bg-[#001D31] min-h-screen flex flex-col">
      {/* Header Section */}
      <PublicHeader />
      {/* Main Content Container */}
      <div className="flex-grow container mx-auto p-4 mt-28 pt-20 space-y-10"> {/* Increased mt-20 to mt-28 */}
        {/* Air Quality Index and Description Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* AQI Value and Description */}
          <div className="p-8 bg-gray-900 rounded-lg shadow-lg flex flex-col items-center md:items-start">
            <DynamicAQI />
          </div>

          {/* Line Chart */}
          <div className="p-8 bg-gray-900 rounded-lg shadow-lg">
            <LineChartPublic />
          </div>
        </div>

        {/* New Metrics Section */}
        <AirQualityMetrics />
      </div>
    </div>
  );
}

export default PublicPage;
