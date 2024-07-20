// src/components/TodayBills.js

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { getBillsByDate } from "../redux/slices/billingDetails/ezBillingDetailsSlice";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

const TodayBills = () => {
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const { message } = useSelector((state) => state.message);
  const { UserDetails } = useSelector((state) => state.ezLogin);
  const { BillsByDate,isgetBilllsByDatePending } = useSelector((state) => state.ezInvoiceDetails);
  const dispatch = useDispatch();

  const userID = UserDetails.user.id;
  const initialValues = {
    date: new Date()
  };

  const handleRegister = (formValues) => {
    const { date } = formValues;
    const details = {
      dgst: userID,
      date: moment.utc(date).format("YYYY-MM-DD")
    };

    setLoading(true);
    dispatch(getBillsByDate({ details }))
      .then(() => {
        setSuccessful(true);
        setLoading(false);
      })
      .catch((error) => {
        setSuccessful(false);
        setLoading(false);
        console.error("Error fetching GST details:", error);
      });
  };
  const columns = [
    {
      dataField: 'cno',
      text: 'Customer Name',
      filter: textFilter({
        placeholder: 'Enter Customer Name',
      }),
    },
    {
      dataField: 'bno',
      text: 'Invoice No',
      filter: textFilter({
        placeholder: 'Enter Invoice No',
      }),
    },
    {
      dataField: 'date',
      text: 'Invoice Date',
      filter: textFilter({
        placeholder: 'Search With Date',
      }),
    },
    {
      dataField: 'amount',
      text: 'Invoice Total Amount',
      filter: textFilter({
        placeholder: 'Enter Amount to filter',
      }),
    }
  ];

  // Options for pagination
  const options = {
    sizePerPage: 10,
    hideSizePerPage: true,
    hidePageListOnlyOnePage: true
  };

  return (
    <div className="form-length">
      {loading && <div className="divLoader">Loading...</div>}
      {(
        <div className="card card-container container">
          <h3>Select Date For bills Details</h3>
          <Formik
            initialValues={initialValues}
            onSubmit={handleRegister}
            validationSchema={Yup.object().shape({
              date: Yup.date().required("Date is required.")
            })}
          >
            {({ handleSubmit, setFieldValue, values }) => (
              <Form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="date">Date:</label>
                  <DatePicker
                    name="date"
                    selected={values.date}
                    onChange={(date) => setFieldValue('date', date)}
                  />
                  <ErrorMessage name="date" component="div" />
                </div>
                <br />
                <button type="submit" className="btn btn-primary btn-block">
                  Get Bills Details
                </button>
              </Form>
            )}
          </Formik>
        </div>
      )}
      {message && (
        <div className="form-group">
          <div className={successful ? "alert alert-success" : "alert alert-danger"} role="alert">
            {message}
          </div>
        </div>
      )}
      <div>
      {loading ? (
        <center><p>Please wait...</p></center> // Replace with your loading indicator (e.g., spinner)
      ) : (
        <BootstrapTable
          keyField="id"
          data={BillsByDate}
          columns={columns}
          pagination={paginationFactory(options)}
          filter={filterFactory()}
          filterPosition="bottom"
        />
      )}
    </div>
    </div>
  );
};

export default TodayBills;
