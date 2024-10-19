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

const ProductSalesQtyGraph = () => {
    const dispatch = useDispatch();
    const { productSaleQty, loading, error } = useSelector((state) => state.ezInvoiceDetails);

    const salesData = useMemo(() => {
        if (!productSaleQty || !productSaleQty.length) return {
            labels: [],
            datasets: [],
        };

        const uniqueProductLabels = Array.from(new Set(productSaleQty.map((data) => data.productName)));
        const colors = uniqueProductLabels.map((_, index) => 
            `hsl(${index * 360 / uniqueProductLabels.length}, 70%, 80%)`
        );

        return {
            labels: uniqueProductLabels,
            datasets: [
                {
                    label: "Total Quantity",
                    data: productSaleQty.map((data) => data.totalQty),
                    borderColor: "#B6FFFA",
                    borderWidth: 1,
                    backgroundColor: colors,
                },
            ],
        };
    }, [productSaleQty]);

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
                font: {
                    weight: 'bold',
                },
            },
        },
        scales: {
            x: {
                beginAtZero: true,
                ticks: {
                    autoSkip: false,  // Ensures all labels are displayed
                    maxRotation: 90,  // Rotates the labels for readability
                    minRotation: 45,  // Min rotation to avoid overlap
                },
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
        <div style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
            <div style={{ width: `${salesData.labels.length * 100}px`, height: '450px' }}>
                <Bar
                    data={salesData}
                    options={chartOptions}
                    style={{ width: '100%', height: '100%' }}
                />
            </div>
        </div>
    );
};

export default ProductSalesQtyGraph;
