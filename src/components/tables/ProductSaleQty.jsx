import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import {
  getCompanyNames,
  clearCompanyDetailsByID,
} from "../redux/slices/companydetails/ezCompanyDetailsSlice";
import { getProductSales } from "../redux/slices/billingDetails/ezBillingDetailsSlice";
import GSTSalesTable from "../tables/GstSalesTable";
import ProductSaleQtyReport from "./ProductSaleQtyReport";
import ProductSalesQtyGraph from "../reports/ProductSalesQtyGraph";
import ProductSalesAmountGraph from "../reports/ProductSalesAmountGraph";

const ProductSaleQty = () => {
  const [loading, setLoading] = useState(false);
  const { message } = useSelector((state) => state.message);
  const { UserDetails } = useSelector((state) => state.ezLogin);
  const [successful, setSuccessful] = useState(false);
  const {
    GstSalesOfCustomer,
    GstSalesOfGstCustomer,
    isgetGstSalesOfCustomersPending,
    isgetGstSalesOfGstCustomersPending,
  } = useSelector((state) => state.ezInvoiceDetails);
  const dispatch = useDispatch();

  const userID = UserDetails.user.id;

  useEffect(() => {
    dispatch(getCompanyNames({ userID }))
      .unwrap()
      .catch(() => {});
    dispatch(clearCompanyDetailsByID());
  }, [dispatch, userID]);

  const initialValues = {
    todate: new Date(),
    fromdate: new Date(),
  };
  const { companyNames, isgetCompanyDetailsByIDPending } = useSelector(
    (state) => state.ezCompanyDetails
  );
  const { productSaleQty, isgetProductSaleQtyPending } = useSelector(
    (state) => state.ezInvoiceDetails
  );
  const handleRegister = (formValues) => {
    const { fromdate, todate, name } = formValues;
    const details = {
      productCompany: name,
      startDate: fromdate,
      endDate: todate,
    };

    dispatch(getProductSales({ details }))
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
      {!productSaleQty && (
        <div className="card card-container container">
          <h3>Select Dates And Comapany for Product Sale Qty</h3>
          <Formik
            initialValues={initialValues}
            onSubmit={handleRegister}
            validationSchema={Yup.object().shape({
              todate: Yup.date().required("End Date is required."),
              fromdate: Yup.date().required("Start Date is required."),
            })}
          >
            {({ handleSubmit, setFieldValue, values }) => (
              <Form onSubmit={handleSubmit}>
                <div>
                  <div>
                    <label htmlFor="name">Company Name</label>
                    <Field name="name">
                      {({ field, form }) => (
                        <div>
                          <input
                            type="text"
                            {...field}
                            list="companyOptions"
                            className="form-control"
                            placeholder="Search..."
                          />
                          <datalist id="companyOptions">
                            {companyNames &&
                              companyNames.map((companyName) => (
                                <option
                                  key={companyName.id}
                                  value={companyName.name}
                                />
                              ))}
                          </datalist>
                        </div>
                      )}
                    </Field>
                    <label htmlFor="fromdate">Start Date:</label>
                    <DatePicker
                      name="fromdate"
                      selected={values.fromdate}
                      onChange={(date) => setFieldValue("fromdate", date)}
                    />
                    <ErrorMessage name="fromdate" component="div" />
                  </div>
                  <div>
                    <label htmlFor="todate">End Date:</label>
                    <DatePicker
                      name="todate"
                      selected={values.todate}
                      onChange={(date) => setFieldValue("todate", date)}
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
        </div>
      )}
      {message && (
        <div className="form-group">
          <div
            className={
              successful ? "alert alert-success" : "alert alert-danger"
            }
            role="alert"
          >
            {message}
          </div>
        </div>
      )}
      {isgetProductSaleQtyPending && (
        <center>
          <div className="divLoader">Please wait...</div>
        </center>
      )}
      {productSaleQty && <ProductSaleQtyReport />}
      {productSaleQty && <ProductSalesQtyGraph />}
      {productSaleQty && <ProductSalesAmountGraph />}
    </div>
  );
};

export default ProductSaleQty;
