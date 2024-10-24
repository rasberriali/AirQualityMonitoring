import React from 'react';
import axios from 'axios';


const jsonToCsv = (jsonData) => {
  if (!Array.isArray(jsonData) || jsonData.length === 0) {
    console.error('The provided data is not a valid array or is empty:', jsonData);
    return '';
  }

  const csvRows = [];

  const headers = Object.keys(jsonData[0]);
  csvRows.push(headers.join(',')); 

  jsonData.forEach(row => {
    const values = headers.map(header => {t
      if (row[header]) {
        const value = row[header].N || row[header].S || '';
        return typeof value === 'string' ? value.replace(/\n/g, '').trim() : value;
      }
      return '';
    });

    console.log('CSV Row:', values);
    csvRows.push(values.join(','));
  });

  return csvRows.join('\n');
};



const grabData = async () => {
  const apiUrl = 'https://7mbe947lp3.execute-api.ap-southeast-2.amazonaws.com/AiRizzFunction';
  try {
    const response = await axios.get(apiUrl);
    const data = response.data;

    const csvData = jsonToCsv(data);

    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'air_quality_data.csv'); 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); 
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

function Header() {
  return (
    <div className=''>
        <button
          onClick={grabData}
          className="py-2 px-4 rounded-full bg-violet-500 text-white font-semibold hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-300 shadow-md transition-all">
          Grab Data
        </button>
    </div>
  );
}

export default Header;
