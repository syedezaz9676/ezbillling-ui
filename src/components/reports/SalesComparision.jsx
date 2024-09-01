import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels'; // Import the plugin
import { getMontlySales } from '../redux/slices/billingDetails/ezBillingDetailsSlice';

// Register the components needed for the Bar chart and the plugin
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels // Register the plugin
);

const SalesComparision = () => {
    const dispatch = useDispatch();
    const { Montlysales, loading, error } = useSelector((state) => state.ezInvoiceDetails);

    const [salesData, setSalesData] = useState({
        labels: [],
        datasets: [
            {
                label: "Monthly Sales",
                data: [],
                borderColor: "#B6FFFA",
                borderWidth: 1,
                backgroundColor: [], // Fill with dynamic colors if needed
            },
        ],
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(getMontlySales()).unwrap();
                const uniqueRaceLabels = Array.from(new Set(Montlysales.map((data) => data.id)));
                const colors = uniqueRaceLabels.map((_, index) => 
                    `hsl(${index * 360 / uniqueRaceLabels.length}, 70%, 80%)`
                );
                setSalesData({
                    labels: uniqueRaceLabels,
                    datasets: [
                        {
                            label: "Monthly Sales",
                            data: Montlysales.map((data) => data.totalAmount),
                            borderColor: "#B6FFFA",
                            borderWidth: 1,
                            backgroundColor: colors,
                        },
                    ],
                });
            } catch (err) {
                console.error("Failed to fetch monthly sales data:", err);
            }
        };

        fetchData();
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <Bar
                data={salesData}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        datalabels: {
                            color: '#000', // Text color
                            anchor: 'end', // Positioning
                            align: 'top',
                            offset: 4, // Distance from the top of the bar
                            formatter: (value) => {
                                return `₹${value}`; // Format the value as needed
                            },
                            font: {
                                weight: 'bold',
                            },
                        },
                    },
                    scales: {
                        x: {
                            beginAtZero: true,
                        },
                        y: {
                            beginAtZero: true,
                        },
                    },
                }}
                style={{ width: '400px', height: '450px' }} // Adjust these values as needed
            />
        </div>
    );
};

export default SalesComparision;
