import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { clearMessage } from "../redux/message";
import { showEdit } from "../redux/slices/ezEnableFiledSlice";
import {
  getCustomerDetailsByID,
  getCustomerNames,
  deActivateCustomer,
} from "../redux/ezCustomerRegistrationSlice";
import CustomerRegister from "./CustomerRegistration";

const EditCustomerDetails = () => {
  const { UserDetails } = useSelector((state) => state.ezLogin);
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.message);
  const [successful, setSuccessful] = useState(false);
  const { isEdit } = useSelector((state) => state.ezEnableField);

  const userID = UserDetails.user.id;

  useEffect(() => {
    dispatch(getCustomerNames({ userID })).catch(() => {});
  }, [dispatch, userID]);

  const { customerNames, isgetCustomerDetailsByIDPendng } = useSelector(
    (state) => state.ezCustomerRegistration
  );

  const getIdByName = useMemo(
    () => (name) => {
      const customer = customerNames.find((customer) => customer.cname === name);
      return customer ? customer.id : null;
    },
    [customerNames]
  );

  const initialValues = {
    name: "",
    gstPer: [],
  };

  const getname = useMemo(
    () => customerNames.map((bill) => bill.cname),
    [customerNames]
  );

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Customer Name is required.")
      .test("is-valid-invoice", "Select valid customer name", (value) =>
        getname.includes(value)
      ),
  });

  const handleRegister = (formValue) => {
    const id = getIdByName(formValue.name);
    dispatch(getCustomerDetailsByID({ id }));
    dispatch(showEdit());
  };

  const handleDeActivate = (name, resetForm) => {
    // Confirmation pop-up before proceeding
    if (window.confirm(`Are you sure you want to deactivate ${name}?`)) {
      const id = getIdByName(name);
      dispatch(deActivateCustomer({ id }))
        .unwrap()
        .then(() => {
          resetForm();
        })
        .catch(() => {});
    }
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
              {({ resetForm, values }) => (
                <Form>
                  <div className="form-group">
                    <div>
                      <label htmlFor="name">Search Customer Name</label>
                      <Field name="name">
                        {({ field }) => (
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
                                customerNames.map((customerName) => (
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
                    <button
                      type="submit"
                      className="btn btn-primary btn-block"
                      style={{ marginRight: "10px" }}
                    >
                      Edit Details
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger btn-block"
                      onClick={() => handleDeActivate(values.name, resetForm)}
                    >
                      Deactivate Customer
                    </button>
                  </div>
                </Form>
              )}
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
        </div>
      )}
      {isEdit && !isgetCustomerDetailsByIDPendng && <CustomerRegister />}
    </div>
  );
};

export default EditCustomerDetails;
