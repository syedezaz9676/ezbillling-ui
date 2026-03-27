import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

import { getSalesDetails } from "../redux/slices/billingDetails/ezBillingDetailsSlice";
import HsnCodeReportingTable from "./HsnCodeReportingTable";
import SalesGraph from "./SalesGraph";
import './GraphStyles.css';

const SalesReport = () => {
  const [loading, setLoading] = useState(false);
  const { message } = useSelector((state) => state.message);
  const { UserDetails } = useSelector((state) => state.ezLogin);
  const [successful, setSuccessful] = useState(false);
  const {SalesDetails,isgetSalesDetailsPending } = useSelector((state) => state.ezInvoiceDetails);
  const dispatch = useDispatch();

  const userID = UserDetails.user.id;
  const initialValues = {
    todate: new Date(),
    fromdate: new Date()
  };
  
  const handleRegister = (formValues) => {
    const { fromdate, todate } = formValues;
    const dates = {
      dgst: userID,
      startDate: fromdate,
      endDate: todate
    };

    dispatch(getSalesDetails({ dates }))
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching GST details:", error);
      });
  };

  return (
    <div className="report-page-container">
      {/* Filter Section - Always Visible */}
      <div className="filter-section">
        <div className="filter-card-modern">
          <h3 className="filter-heading">
            <span>📅</span> Select Date Range
          </h3>
          <Formik
            initialValues={initialValues}
            onSubmit={handleRegister}
            validationSchema={Yup.object().shape({
              todate: Yup.date().required("End Date is required."),
              fromdate: Yup.date().required("Start Date is required.")
            })}
          >
            {({ handleSubmit, setFieldValue, values }) => (
              <Form onSubmit={handleSubmit} className="filter-form-modern">
                <div className="date-row">
                  <div className="date-field">
                    <label><span>📆</span> Start Date</label>
                    <DatePicker
                      name="fromdate"
                      selected={values.fromdate}
                      onChange={(date) => setFieldValue('fromdate', date)}
                      className="input-modern"
                      dateFormat="dd/MM/yyyy"
                    />
                    <ErrorMessage name="fromdate" component="div" className="field-error" />
                  </div>
                  <div className="date-field">
                    <label><span>📆</span> End Date</label>
                    <DatePicker
                      name="todate"
                      selected={values.todate}
                      onChange={(date) => setFieldValue('todate', date)}
                      className="input-modern"
                      dateFormat="dd/MM/yyyy"
                    />
                    <ErrorMessage name="todate" component="div" className="field-error" />
                  </div>
                </div>
                <button type="submit" className="btn-modern">
                  <span>🔍</span> Get Details
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      {/* Results Section - Same Screen */}
      <div className="results-section">
        {message && (
          <div className={successful ? "alert-success" : "alert-error"}>
            {message}
          </div>
        )}
        
        {isgetSalesDetailsPending && (
          <div className="graph-loading">
            <div className="loading-spinner"></div>
            <p>Loading sales data...</p>
          </div>
        )}
        
        {SalesDetails && !isgetSalesDetailsPending && (
          <div className="graph-result-container">
            <SalesGraph data={SalesDetails}/>
          </div>
        )}
        
        {!SalesDetails && !isgetSalesDetailsPending && (
          <div className="empty-result">
            <span className="empty-icon">📊</span>
            <p>Select date range and click "Get Details" to view sales report</p>
          </div>
        )}
      </div>

      <style>{`
        .report-page-container {
          display: flex;
          flex-direction: column;
          gap: 20px;
          padding: 20px;
          max-width: 1400px;
          margin: 0 auto;
        }
        
        .filter-section {
          flex-shrink: 0;
        }
        
        .filter-card-modern {
          background: #ffffff;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          border: 1px solid #e5e7eb;
        }
        
        .filter-heading {
          font-size: 1.125rem;
          font-weight: 700;
          color: #111827;
          margin: 0 0 20px 0;
          display: flex: center;
          gap: 8px;
        }
        
        .filter-form-modern {
          display: flex;
;
          align-items          flex-direction: column;
          gap: 16px;
        }
        
        .date-row {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }
        
        .date-field {
          flex: 1;
          min-width: 200px;
        }
        
        .date-field label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-weight: 500;
          font-size: 0.875rem;
          color: #374151;
          margin-bottom: 6px;
        }
        
        .input-modern {
          width: 100%;
          padding: 10px 14px;
          font-size: 0.9375rem;
          border: 2px solid #e5e7eb;
          border-radius: 10px;
          transition: all 0.2s;
          background: #f9fafb;
          box-sizing: border-box;
        }
        
        .input-modern:focus {
          outline: none;
          border-color: #6366f1;
          background: #fff;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }
        
        .field-error {
          color: #ef4444;
          font-size: 0.75rem;
          margin-top: 4px;
        }
        
        .btn-modern {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px 24px;
          font-size: 0.9375rem;
          font-weight: 600;
          color: #fff;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 4px 6px -1px rgba(99, 102, 241, 0.3);
        }
        
        .btn-modern:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 12px -2px rgba(99, 102, 241, 0.4);
        }
        
        .results-section {
          flex: 1;
          min-height: 400px;
        }
        
        .graph-result-container {
          animation: fadeIn 0.4s ease-out;
        }
        
        .empty-result {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 400px;
          background: #f9fafb;
          border-radius: 16px;
          border: 2px dashed #e5e7eb;
        }
        
        .empty-result .empty-icon {
          font-size: 4rem;
          margin-bottom: 16px;
          opacity: 0.5;
        }
        
        .empty-result p {
          color: #6b7280;
          font-size: 1rem;
        }
        
        .alert-error {
          padding: 12px 16px;
          background: #fef2f2;
          color: #991b1b;
          border-radius: 8px;
          margin-bottom: 16px;
        }
        
        .alert-success {
          padding: 12px 16px;
          background: #ecfdf5;
          color: #065f46;
          border-radius: 8px;
          margin-bottom: 16px;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @media (max-width: 768px) {
          .report-page-container {
            padding: 12px;
          }
          .date-row {
            flex-direction: column;
          }
          .filter-card-modern {
            padding: 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default SalesReport;
