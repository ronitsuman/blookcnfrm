import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BookingChart = ({ analytics }) => {
  console.log('BookingChart analytics:', analytics); // Debug

  if (!analytics || !Array.isArray(analytics) || analytics.length === 0) {
    return <p className="text-gray-500 text-center">No data available</p>;
  }

  const data = {
    labels: ['Pending', 'Confirmed', 'Rejected', 'Cancelled'],
    datasets: [
      {
        label: 'Booking Count',
        data: [
          analytics.find(a => a.status === 'pending')?.count || 0,
          analytics.find(a => a.status === 'confirmed')?.count || 0,
          analytics.find(a => a.status === 'rejected')?.count || 0,
          analytics.find(a => a.status === 'cancelled')?.count || 0,
        ],
        backgroundColor: ['#4261FF', '#28A745', '#DC3545', '#FFC107'],
        borderColor: ['#4261FF', '#28A745', '#DC3545', '#FFC107'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Count' },
      },
      x: {
        title: { display: true, text: 'Status' },
      },
    },
    plugins: {
      legend: { display: true, position: 'top' },
      title: { display: true, text: 'Booking Status Distribution' },
    },
  };

  return (
    <div className="w-full h-64">
      <Bar data={data} options={options} />
    </div>
  );
};

export default BookingChart;