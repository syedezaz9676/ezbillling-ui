// src/components/ProductMonthlySalesAmountAndQtyGraph.js

import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const ChartComponent = ({ chartData, chartOptions }) => (
  <Bar
    data={chartData}
    options={chartOptions}
    style={{ width: '100%', height: '100%' }}
  />
);

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
  const generateChartData = (label, dataKey) => {
    if (!productSaleQtyMonthly || !productSaleQtyMonthly.length) {
      return { labels: [], datasets: [] };
    }

    // Sort the data by month
    const sortedData = sortByMonth(productSaleQtyMonthly);

    const uniqueProductLabels = sortedData.map((data) => data.id);
    const colors = uniqueProductLabels.map((_, index) =>
      `hsl(${index * 360 / uniqueProductLabels.length}, 70%, 80%)`
    );

    return {
      labels: uniqueProductLabels,
      datasets: [
        {
          label: label,
          data: sortedData.map((data) => data[dataKey]),
          borderColor: "#B6FFFA",
          borderWidth: 1,
          backgroundColor: colors,
        },
      ],
    };
  };

  const salesData = useMemo(() => generateChartData("Total Amount", "totalAmount"), [productSaleQtyMonthly]);
  const qtyData = useMemo(() => generateChartData("Total Quantity", "totalQty"), [productSaleQtyMonthly]);

  const chartOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        color: '#000',
        anchor: 'end',
        align: 'top',
        offset: 4,
        formatter: (value) => `${value}`,
        font: { weight: 'bold' },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          autoSkip: false,
          maxRotation: 90,
          minRotation: 45,
        },
      },
      y: { beginAtZero: true },
    },
  }), []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error?.message || "An error occurred"}</div>;

  return (
    <div style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
      <div style={{ width: `${salesData.labels.length * 100}px`, height: '450px' }}>
        <ChartComponent chartData={salesData} chartOptions={chartOptions} />
        <ChartComponent chartData={qtyData} chartOptions={chartOptions} />
      </div>
    </div>
  );
};

export default ProductMonthlySalesAmountAndQtyGraph;
