import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { getMonthlyCompanySales } from "../redux/slices/billingDetails/ezBillingDetailsSlice";
import { getCompanyNames } from "../redux/slices/companydetails/ezCompanyDetailsSlice";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import "react-datepicker/dist/react-datepicker.css";
import "./MontlyCompanySales.css"; // Assuming you have a styles.css for custom styles

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

const MonthlyCompanySales = () => {
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [selectedCompanyName, setSelectedCompanyName] = useState(""); // Track selected company
  const dispatch = useDispatch();

  const { message } = useSelector((state) => state.message);
  const { UserDetails } = useSelector((state) => state.ezLogin);
  const { companyNames } = useSelector((state) => state.ezCompanyDetails);
  const { MonthlyCompanySales } = useSelector((state) => state.ezInvoiceDetails);

  const userID = UserDetails.user.id;

  useEffect(() => {
    dispatch(getCompanyNames({ userID })).catch(() => {});
  }, [dispatch, userID]);

  const salesData = useMemo(() => {
    if (!MonthlyCompanySales || !MonthlyCompanySales.length) return { labels: [], datasets: [] };

    const uniqueCompanyLabels = Array.from(new Set(MonthlyCompanySales.map((data) => data.id)));
    const colors = uniqueCompanyLabels.map((_, index) => `hsl(${index * 360 / uniqueCompanyLabels.length}, 70%, 80%)`);

    return {
      labels: uniqueCompanyLabels,
      datasets: [
        {
          label: "Monthly Sales",
          data: MonthlyCompanySales.map((data) => data.totalAmount),
          borderColor: "#B6FFFA",
          borderWidth: 1,
          backgroundColor: colors,
        },
      ],
    };
  }, [MonthlyCompanySales]);

  const chartOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: true, // Keeps the chart responsive
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

  const initialValues = { name: "", months: "" };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Please select a company."),
    months: Yup.number().min(1, "Months should be at least 1.").required("Please enter months."),
  });

  const handleRegister = async (formValues) => {
    const details = { company: formValues.name, months: formValues.months };

    setLoading(true);
    setSelectedCompanyName(""); // Reset before submission
    try {
      await dispatch(getMonthlyCompanySales({ details }));
      setSelectedCompanyName(formValues.name); // Set the selected company after successful fetch
      setSuccessful(true);
    } catch (error) {
      console.error("Error fetching sales details:", error);
      setSuccessful(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-length">
      {loading && <div className="divLoader">Loading...</div>}

      <div className="card card-container">
        <h3>Select Company and Months to Get Monthly Sales</h3>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
        >
          <Form>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="name">Select Company Name</label>
                <Field as="select" name="name" className="form-control">
                  <option value="">--Please Select--</option>
                  {companyNames?.map((companyName, index) => (
                    <option key={index} value={companyName.name}>
                      {companyName.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="name" component="div" className="alert alert-danger" />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="months">No of Months</label>
                <Field name="months" type="number" className="form-control" />
                <ErrorMessage name="months" component="div" className="alert alert-danger" />
              </div>
            </div>

            <br />
            <button type="submit" className="btn btn-primary btn-block">
              Get Sales
            </button>
          </Form>
        </Formik>
      </div>

      {message && (
        <div className="form-group">
          <div className={successful ? "alert alert-success" : "alert alert-danger"} role="alert">
            {message}
          </div>
        </div>
      )}

      <div>
        {/* Conditionally render the company name after successful data fetch */}
        {successful && selectedCompanyName && (
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <h4>Monthly Sales for: {selectedCompanyName}</h4>
          </div>
        )}

        {loading ? (
          <center>
            <p>Please wait...</p>
          </center>
        ) : (
          <div className="chart-container">
            <Bar data={salesData}
             options={chartOptions} 
            style={{ width: '400px', height: '400px' }}/>
          </div>
        )}
      </div>
    </div>
  );
};

export default MonthlyCompanySales;
