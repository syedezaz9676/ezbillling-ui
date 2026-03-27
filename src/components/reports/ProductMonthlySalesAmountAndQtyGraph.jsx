// src/components/ProductMonthlySalesAmountAndQtyGraph.js

import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import './GraphStyles.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartDataLabels
);

// Modern gradient palettes
const amountGradient = ['#6366f1', '#8b5cf6', '#a78bfa', '#c4b5fd'];
const qtyGradient = ['#10b981', '#34d399', '#6ee7b7', '#a7f3d0'];

const ChartComponent = ({ chartData, chartOptions, type = 'bar' }) => {
  const Component = type === 'line' ? Line : Bar;
  return (
    <Component
      data={chartData}
      options={chartOptions}
    />
  );
};

const ProductMonthlySalesAmountAndQtyGraph = () => {
  const dispatch = useDispatch();
  const { productSaleQtyMonthly, loading, error } = useSelector((state) => state.ezInvoiceDetails);

  // Define month order for sorting
  const monthOrder = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Function to sort data by month
  const sortByMonth = (data) => {
    return [...data].sort((a, b) => monthOrder.indexOf(a.id) - monthOrder.indexOf(b.id));
  };

  // Generate chart data function
  const generateChartData = (label, dataKey, colors, isLine = false) => {
    if (!productSaleQtyMonthly || !productSaleQtyMonthly.length) {
      return { labels: [], datasets: [] };
    }

    // Sort the data by month
    const sortedData = sortByMonth(productSaleQtyMonthly);

    const uniqueLabels = sortedData.map((data) => data.id);
    
    if (isLine) {
      return {
        labels: uniqueLabels,
        datasets: [
          {
            label: label,
            data: sortedData.map((data) => data[dataKey]),
            borderColor: colors[0],
            backgroundColor: (context) => {
              const ctx = context.chart.ctx;
              const gradient = ctx.createLinearGradient(0, 0, 0, 300);
              gradient.addColorStop(0, colors[0] + '40');
              gradient.addColorStop(1, colors[0] + '00');
              return gradient;
            },
            borderWidth: 3,
            pointBackgroundColor: colors[0],
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 6,
            pointHoverRadius: 8,
            fill: true,
            tension: 0.4,
          },
        ],
      };
    }
    
    return {
      labels: uniqueLabels,
      datasets: [
        {
          label: label,
          data: sortedData.map((data) => data[dataKey]),
          backgroundColor: sortedData.map((_, index) => {
            const color = colors[index % colors.length];
            return (context) => {
              const ctx = context.chart.ctx;
              const gradient = ctx.createLinearGradient(0, 0, 0, 300);
              gradient.addColorStop(0, color + 'dd');
              gradient.addColorStop(1, color + '66');
              return gradient;
            };
          }),
          borderColor: colors[0],
          borderWidth: 1,
          borderRadius: 6,
          borderSkipped: false,
        },
      ],
    };
  };

  const salesData = useMemo(() => generateChartData("Total Amount (₹)", "totalAmount", amountGradient), [productSaleQtyMonthly]);
  const qtyData = useMemo(() => generateChartData("Total Quantity", "totalQty", qtyGradient, true), [productSaleQtyMonthly]);

  const barChartOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#374151',
          font: {
            family: "'Inter', sans-serif",
            size: 12,
            weight: 600,
          },
          padding: 20,
          usePointStyle: true,
        },
      },
      title: {
        display: true,
        text: 'Monthly Sales - Amount',
        color: '#111827',
        font: {
          family: "'Inter', sans-serif",
          size: 16,
          weight: 700,
        },
        padding: { bottom: 15 },
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.95)',
        titleColor: '#fff',
        bodyColor: '#e5e7eb',
        borderColor: 'rgba(99, 102, 241, 0.5)',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
        callbacks: {
          label: function(context) {
            return `Amount: ₹${context.parsed.y.toLocaleString('en-IN')}`;
          }
        }
      },
      datalabels: {
        color: '#374151',
        anchor: 'end',
        align: 'top',
        offset: 6,
        formatter: (value) => `₹${(value/1000).toFixed(1)}k`,
        font: { weight: 'bold', size: 10 },
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 4,
        padding: 3,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: '#6b7280',
          font: { family: "'Inter', sans-serif", size: 11, weight: 500 },
        },
        border: { display: false },
      },
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(107, 114, 128, 0.1)', drawBorder: false },
        ticks: {
          color: '#6b7280',
          font: { family: "'Inter', sans-serif", size: 11, weight: 500 },
          callback: (value) => '₹' + (value/1000).toFixed(0) + 'k'
        },
        border: { display: false },
      },
    },
  }), []);

  const lineChartOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#374151',
          font: {
            family: "'Inter', sans-serif",
            size: 12,
            weight: 600,
          },
          padding: 20,
          usePointStyle: true,
        },
      },
      title: {
        display: true,
        text: 'Monthly Sales - Quantity',
        color: '#111827',
        font: {
          family: "'Inter', sans-serif",
          size: 16,
          weight: 700,
        },
        padding: { bottom: 15 },
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.95)',
        titleColor: '#fff',
        bodyColor: '#e5e7eb',
        borderColor: 'rgba(16, 185, 129, 0.5)',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
        callbacks: {
          label: function(context) {
            return `Quantity: ${context.parsed.y.toLocaleString('en-IN')} units`;
          }
        }
      },
      datalabels: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: '#6b7280',
          font: { family: "'Inter', sans-serif", size: 11, weight: 500 },
        },
        border: { display: false },
      },
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(107, 114, 128, 0.1)', drawBorder: false },
        ticks: {
          color: '#6b7280',
          font: { family: "'Inter', sans-serif", size: 11, weight: 500 },
        },
        border: { display: false },
      },
    },
    elements: {
      line: {
        borderWidth: 3,
      },
      point: {
        radius: 6,
        hoverRadius: 8,
      },
    },
  }), []);

  if (loading) return (
    <div className="graph-loading">
      <div className="loading-spinner"></div>
      <p>Loading monthly sales data...</p>
    </div>
  );
  
  if (error) return (
    <div className="graph-error">
      <span className="error-icon">⚠️</span>
      <p>Error: {error?.message || "An error occurred"}</p>
    </div>
  );

  return (
    <div className="graphs-wrapper">
      <div className="graph-container-modern">
        <ChartComponent chartData={salesData} chartOptions={barChartOptions} type="bar" />
      </div>
      <div className="graph-container-modern">
        <ChartComponent chartData={qtyData} chartOptions={lineChartOptions} type="line" />
      </div>
    </div>
  );
};

export default ProductMonthlySalesAmountAndQtyGraph;
