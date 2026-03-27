import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { getMontlySales } from '../redux/slices/billingDetails/ezBillingDetailsSlice';
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

// Modern gradient colors
const gradientColors = [
  { start: '#6366f1', end: '#8b5cf6' },  // Indigo to Purple
  { start: '#06b6d4', end: '#3b82f6' },  // Cyan to Blue
  { start: '#10b981', end: '#06b6d4' },  // Emerald to Cyan
  { start: '#f59e0b', end: '#ef4444' },  // Amber to Red
  { start: '#ec4899', end: '#8b5cf6' },  // Pink to Purple
  { start: '#14b8a6', end: '#06b6d4' },  // Teal to Cyan
];

const SalesComparision = () => {
    const dispatch = useDispatch();
    const { Montlysales, loading, error } = useSelector((state) => state.ezInvoiceDetails);

    const salesData = useMemo(() => {
        if (!Montlysales || !Montlysales.length) return {
            labels: [],
            datasets: [],
        };

        const uniqueRaceLabels = Array.from(new Set(Montlysales.map((data) => data.id)));
        
        return {
            labels: uniqueRaceLabels,
            datasets: [
                {
                    label: "Monthly Sales",
                    data: Montlysales.map((data) => data.totalAmount),
                    borderColor: gradientColors[0].start,
                    backgroundColor: (context) => {
                        const ctx = context.chart.ctx;
                        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
                        gradient.addColorStop(0, 'rgba(99, 102, 241, 0.8)');
                        gradient.addColorStop(1, 'rgba(139, 92, 246, 0.2)');
                        return gradient;
                    },
                    borderWidth: 2,
                    borderRadius: 8,
                    borderSkipped: false,
                    fill: true,
                    tension: 0.4,
                },
            ],
        };
    }, [Montlysales]);

    useEffect(() => {
        dispatch(getMontlySales()).unwrap().catch((err) => {
            console.error("Failed to fetch monthly sales data:", err);
        });
    }, [dispatch]);

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
                text: 'Monthly Sales Comparison',
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
                        return `Sales: ₹${context.parsed.y.toLocaleString('en-IN')}`;
                    }
                }
            },
            datalabels: {
                color: '#374151',
                anchor: 'end',
                align: 'top',
                offset: 8,
                formatter: (value) => `₹${value.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`,
                font: {
                    weight: 'bold',
                    size: 11,
                },
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: 4,
                padding: 4,
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
                        size: 11,
                        weight: 500,
                    },
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
                        return '₹' + value.toLocaleString('en-IN');
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
                <p>Loading sales data...</p>
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

export default SalesComparision;
