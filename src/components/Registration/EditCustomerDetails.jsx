import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import { Navigate, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { clearMessage } from "../redux/message";
import { showEdit } from "../redux/slices/ezEnableFiledSlice";
import {
  getCustomerDetailsByID,
  getCustomerNames,
} from "../redux/ezCustomerRegistrationSlice";
import CustomerRegister from "./CustomerRegistration";

// ... (previous imports)

const EditCustomerDetails = () => {
  const { UserDetails } = useSelector((state) => state.ezLogin);
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.message);
  const [successful, setSuccessful] = useState(false);
  const { isEdit } = useSelector((state) => state.ezEnableField);

  const userID = UserDetails.user.id;
  useEffect(() => {
    dispatch(getCustomerNames({ userID }))
      .unwrap()
      .then(() => {
        // navigate("/dashboard");
        // window.location.reload();
      })
      .catch(() => {});

    // dispatch(clearCompanyDetailsByID());
  }, [dispatch]);
  const { customerNames, isgetCustomerDetailsByIDPendng } = useSelector(
    (state) => state.ezCustomerRegistration
  );
  function getIdByName(customerNames, name) {
    const customer = customerNames.find((customer) => customer.cname === name);
    return customer ? customer.id : null;
  }
  function getNameById(customerNames, id) {
    const customer = customerNames.find((customer) => customer.id === id);
    return customer ? customer.cname : null;
  }
  //   const { GstCodeDetails } = useSelector((state) => state.ezgetGstCodeDetails);

  const initialValues = {
    name: "",
    gstPer: [],
  };
  const getname = (customerNames) => {
    return customerNames.map((bill) => bill.cname);
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Customer Name is required.")
      .test("is-valid-invoice", "Select valid customer name", function (value) {
        return getname(customerNames).includes(value);
      }),
  });

  const handleRegister = (formValue) => {
    console.log("formValue", formValue);
    const id = getIdByName(customerNames, formValue.name);
    dispatch(getCustomerDetailsByID({ id }));
    dispatch(showEdit());
  };

  return (
    <div>
      {!isEdit && (
        <div className="col-md-12 signup-form">
          <div className="card card-container">
            <h3>Edit Customer details</h3>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleRegister}
            >
              <Form>
                {/* ... (other form fields) */}
                <div>
                  <div className="form-group">
                    <div>
                      <label htmlFor="name">Search Customer Name</label>
                      <Field name="name">
                        {({ field, form }) => (
                          <div>
                            <input
                              type="text"
                              {...field}
                              list="selectOptions"
                              className="form-control"
                              placeholder="Search..."
                              defaultValue="select"
                            />
                            <datalist id="selectOptions">
                              {customerNames &&
                                customerNames.map((customerName, index) => (
                                  <option
                                    key={customerName.id}
                                    value={customerName.cname}
                                  />
                                ))}
                            </datalist>
                          </div>
                        )}
                      </Field>
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="alert alert-danger"
                      />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">
                      Edit Details
                    </button>
                  </div>
                </div>
              </Form>
            </Formik>
          </div>
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
        </div>
      )}
      {isEdit && !isgetCustomerDetailsByIDPendng && <CustomerRegister />}
    </div>
  );
};

export default EditCustomerDetails;
