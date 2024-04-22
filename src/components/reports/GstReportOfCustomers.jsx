import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

import { getGstDetailsOfCustomer } from "../redux/slices/billingDetails/ezBillingDetailsSlice";
import ReportingTable from "./ReportingTable";

const GstReportOfCustomers = () => {
  const [loading, setLoading] = useState(false);
  const { message } = useSelector((state) => state.message);
  const { UserDetails } = useSelector((state) => state.ezLogin);
  const [successful, setSuccessful] = useState(false);
  const {GstDetailsOfCustomer,isGstDetailsOfCustomerPending } = useSelector((state) => state.ezInvoiceDetails);
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

    dispatch(getGstDetailsOfCustomer({ dates }))
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching GST details:", error);
      });
  };

  return (
    <div className="form-length">
      {loading && <div className="divLoader">Loading...</div>}
      {!GstDetailsOfCustomer && <div className="card card-container container">
        <h3>Select Dates to get GST Details of Customer</h3>
        <Formik
          initialValues={initialValues}
          onSubmit={handleRegister}
          validationSchema={Yup.object().shape({
            todate: Yup.date().required("End Date is required."),
            fromdate: Yup.date().required("Start Date is required.")
          })}
        >
          {({ handleSubmit, setFieldValue, values }) => (
            <Form onSubmit={handleSubmit}>
              <div>
                <div>
                  <label htmlFor="fromdate">Start Date:</label>
                  <DatePicker
                    name="fromdate"
                    selected={values.fromdate}
                    onChange={(date) => setFieldValue('fromdate', date)}
                  />
                  <ErrorMessage name="fromdate" component="div" />
                </div>
                <div>
                  <label htmlFor="todate">End Date:</label>
                  <DatePicker
                    name="todate"
                    selected={values.todate}
                    onChange={(date) => setFieldValue('todate', date)}
                  />
                  <ErrorMessage name="todate" component="div" />
                </div>
              </div>
              <button type="submit" className="btn btn-primary btn-block">
                Get Details
              </button>
            </Form>
          )}
        </Formik>
      </div>}
      {message && (
        <div className="form-group">
          <div className={successful ? "alert alert-success" : "alert alert-danger"} role="alert">
            {message}
          </div>
        </div>
      )}
       {isGstDetailsOfCustomerPending && <center><div className="divLoader">Please wait...</div></center>}
      {GstDetailsOfCustomer && !isGstDetailsOfCustomerPending && <ReportingTable data={GstDetailsOfCustomer}/>}
    </div>
  );
};

export default GstReportOfCustomers;
