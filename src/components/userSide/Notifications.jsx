import React, { useState, useEffect } from "react";

const Notifications = () => {
  const [isHazardous, setIsHazardous] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    // Simulating hazardous data for testing purposes
    const testData = [
      { co2: 2500, pm1: 1800, pm25: 2100, pm10: 1900 }, // Hazardous
      { co2: 450, pm1: 350, pm25: 300, pm10: 400 },     // Safe
    ];

    const hasHazardous = testData.some(
      (entry) =>
        entry.co2 > 2000 || entry.pm1 > 2000 || entry.pm25 > 2000 || entry.pm10 > 2000
    );

    setTimeout(() => {
      setIsHazardous(hasHazardous);
      setShowNotification(true);
    }, 1000); // 5 seconds delay
  }, []);

  const closeNotification = () => {
    setShowNotification(false);
  };

  return (
    <>
      {showNotification && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-lg font-semibold text-center mb-4">
              {isHazardous ? "Hazardous Levels Detected!" : "Air Quality is Safe"}
            </h3>
            <p className="text-center mb-4">
              {isHazardous
                ? "Please take immediate action to improve air quality."
                : "Everything is normal, no immediate actions needed."}
            </p>
            <div className="flex justify-center">
              <button
                onClick={closeNotification}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Notifications;
