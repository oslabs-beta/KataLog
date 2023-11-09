import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto'

const BarChart = (props) => {
    console.log(props.data)
  const data = {
    labels: ['Kubernetes Cluster 33'],
    datasets: [
      {
        label: 'Info',
        backgroundColor: ['#36A2EB'],
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [props.data[0]],
      },
      {
        label: 'Warning',
        backgroundColor: ['#FFCE56'],
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [props.data[1]],
      },
      {
        label: 'Error',
        backgroundColor: ['#FF3000'],
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [props.data[2]],
      },
      {
        label: 'Ok',
        backgroundColor: ['#00fa00'],
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [props.data[3]],
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
            display: true,
            text: 'Number of Logs',
            font: {
                size: 12,
            }
        }
      },
      x: {
        type: 'category' as 'category',
      },
    }
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;
