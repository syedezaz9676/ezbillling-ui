import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { getMontlySales } from '../redux/slices/billingDetails/ezBillingDetailsSlice';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const SalesComparision = () => {
    const dispatch = useDispatch();
    const { Montlysales, loading, error } = useSelector((state) => state.ezInvoiceDetails);

    const salesData = useMemo(() => {
        if (!Montlysales || !Montlysales.length) return {
            labels: [],
            datasets: [],
        };

        const uniqueRaceLabels = Array.from(new Set(Montlysales.map((data) => data.id)));
        const colors = uniqueRaceLabels.map((_, index) => 
            `hsl(${index * 360 / uniqueRaceLabels.length}, 70%, 80%)`
        );

        return {
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
            datalabels: {
                color: '#000',
                anchor: 'end',
                align: 'top',
                offset: 4,
                formatter: (value) => `₹${value}`,
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
    }), []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error?.message || "An error occurred"}</div>;
    }

    return (
        <div>
            <Bar
                data={salesData}
                options={chartOptions}
                style={{ width: '400px', height: '450px' }}
            />
        </div>
    );
};

export default SalesComparision;
