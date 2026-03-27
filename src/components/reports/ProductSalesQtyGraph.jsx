import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import './GraphStyles.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartDataLabels
);

// Modern gradient palette
const gradientColors = [
  ['#6366f1', '#8b5cf6'],
  ['#06b6d4', '#3b82f6'],
  ['#10b981', '#06b6d4'],
  ['#f59e0b', '#ef4444'],
  ['#ec4899', '#8b5cf6'],
  ['#14b8a6', '#06b6d4'],
  ['#f97316', '#dc2626'],
  ['#8b5cf6', '#d946ef'],
];

const ProductSalesQtyGraph = () => {
    const dispatch = useDispatch();
    const { productSaleQty, loading, error } = useSelector((state) => state.ezInvoiceDetails);

    const salesData = useMemo(() => {
        if (!productSaleQty || !productSaleQty.length) return {
            labels: [],
            datasets: [],
        };

        const uniqueProductLabels = Array.from(new Set(productSaleQty.map((data) => data.productName)));

        return {
            labels: uniqueProductLabels,
            datasets: [
                {
                    label: "Total Quantity Sold",
                    data: productSaleQty.map((data) => data.totalQty),
                    backgroundColor: uniqueProductLabels.map((_, index) => {
                        const colors = gradientColors[index % gradientColors.length];
                        return (context) => {
                            const ctx = context.chart.ctx;
                            const gradient = ctx.createLinearGradient(0, 0, 0, 350);
                            gradient.addColorStop(0, colors[0] + 'cc');
                            gradient.addColorStop(1, colors[1] + '66');
                            return gradient;
                        };
                    }),
                    borderColor: gradientColors.map(c => c[0]),
                    borderWidth: 1,
                    borderRadius: 6,
                    borderSkipped: false,
                },
            ],
        };
    }, [productSaleQty]);

    const chartOptions = useMemo(() => ({
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
                    pointStyle: 'circle',
                },
            },
            title: {
                display: true,
                text: 'Product Sales - Quantity Analysis',
                color: '#111827',
                font: {
                    family: "'Inter', sans-serif",
                    size: 18,
                    weight: 700,
                },
                padding: {
                    bottom: 20,
                },
            },
            tooltip: {
                backgroundColor: 'rgba(17, 24, 39, 0.95)',
                titleColor: '#fff',
                bodyColor: '#e5e7eb',
                borderColor: 'rgba(99, 102, 241, 0.5)',
                borderWidth: 1,
                cornerRadius: 8,
                padding: 12,
                displayColors: true,
                callbacks: {
                    label: function(context) {
                        return `Quantity: ${context.parsed.y.toLocaleString('en-IN')} units`;
                    }
                }
            },
            datalabels: {
                color: '#374151',
                anchor: 'end',
                align: 'top',
                offset: 6,
                formatter: (value) => `${value}`,
                font: {
                    weight: 'bold',
                    size: 10,
                },
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: 4,
                padding: 3,
            },
        },
        scales: {
            x: {
                beginAtZero: true,
                grid: {
                    display: false,
                },
                ticks: {
                    color: '#6b7280',
                    font: {
                        family: "'Inter', sans-serif",
                        size: 10,
                        weight: 500,
                    },
                    maxRotation: 45,
                    minRotation: 45,
                },
                border: {
                    display: false,
                }
            },
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(107, 114, 128, 0.1)',
                    drawBorder: false,
                },
                ticks: {
                    color: '#6b7280',
                    font: {
                        family: "'Inter', sans-serif",
                        size: 11,
                        weight: 500,
                    },
                    callback: function(value) {
                        return value.toLocaleString('en-IN');
                    }
                },
                border: {
                    display: false,
                }
            },
        },
    }), []);

    if (loading) {
        return (
            <div className="graph-loading">
                <div className="loading-spinner"></div>
                <p>Loading product sales data...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="graph-error">
                <span className="error-icon">⚠️</span>
                <p>Error: {error?.message || "An error occurred"}</p>
            </div>
        );
    }

    return (
        <div className="graph-container-modern">
            <Bar
                data={salesData}
                options={chartOptions}
            />
        </div>
    );
};

export default ProductSalesQtyGraph;
