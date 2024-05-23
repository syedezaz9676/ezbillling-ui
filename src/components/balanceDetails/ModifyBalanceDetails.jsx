import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  getBalanceDetailsById,
  modifyBalanceDetails,
} from "../redux/slices/billingDetails/ezBillingDetailsSlice";
import { getCustomerNames } from "../redux/ezCustomerRegistrationSlice";
import { showEdit } from "../redux/slices/ezEnableFiledSlice";

const ModifyBalanceDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { UserDetails } = useSelector((state) => state.ezLogin);
  const { isEdit } = useSelector((state) => state.ezEnableField);
  const { BalanceDetailsById } = useSelector((state) => state.ezInvoiceDetails);
  const { customerNames } = useSelector((state) => state.ezCustomerRegistration);
  const { message } = useSelector((state) => state.message);

  const [selectedField, setSelectedField] = useState("creditBalance");

  const userID = UserDetails.user.id;

  useEffect(() => {
    dispatch(getCustomerNames({ userID })).catch(() => {});
  }, [dispatch, userID]);

  const getInitialValues = () => ({
    cname: isEdit ? BalanceDetailsById.cname : "",
    creditBalance: isEdit ? BalanceDetailsById.creditBalance : "",
    debitBalance: isEdit ? BalanceDetailsById.debitBalance : "",
    totalBalance: isEdit ? BalanceDetailsById.totalBalance : "",
  });

  const getNames = (customers) => customers.map((customer) => customer.cname);

  const validationSchema = Yup.object().shape({
    cname: Yup.string()
      .required("Customer name is required.")
      .test("is-valid-customer", "No customer with given name", (value) =>
        getNames(customerNames).includes(value)
      ),
    creditBalance: Yup.number()
      .when("selectedField", {
        is: "creditBalance",
        then: Yup.number().required("Credit Balance is required."),
      }),
    debitBalance: Yup.number()
      .when("selectedField", {
        is: "debitBalance",
        then: Yup.number().required("Debit Balance is required."),
      }),
    totalBalance: Yup.number()
      .when("selectedField", {
        is: "totalBalance",
        then: Yup.number().required("Total Balance is required."),
      }),
  });

  const handleRegister = (formValue, { setSubmitting }) => {
    const customer = customerNames.find((customer) => customer.cname === formValue.cname);

    if (!isEdit) {
      if (customer) {
        const id = customer.id;
        dispatch(getBalanceDetailsById({ id })).then(() => dispatch(showEdit()));
      }
    } else {
      if (customer) {
        const BalanceDetails = {
          id: BalanceDetailsById.id,
          cno: customer.id,
          creditBalance: formValue.creditBalance,
          debitBalance: formValue.debitBalance,
          totalBalance: formValue.totalBalance,
        };

        dispatch(modifyBalanceDetails({ BalanceDetails }))
          .unwrap()
          .then(() => {
            navigate("/dashboard");
          })
          .catch(() => {});
      }
    }
    setSubmitting(false);
  };

  return (
    <div>
      <div className="col-md-12 signup-form">
        <div className="card card-container">
          <h3>{isEdit ? "Edit Balance Details" : "Edit Balance"}</h3>
          <Formik
            initialValues={getInitialValues()}
            validationSchema={validationSchema}
            onSubmit={handleRegister}
            enableReinitialize
          >
            {({ isSubmitting, values }) => (
              <Form>
                {!isEdit && (
                  <div className="form-group">
                    <label htmlFor="cname">Enter Customer Name</label>
                    <Field name="cname">
                      {({ field }) => (
                        <div>
                          <input
                            type="text"
                            {...field}
                            list="selectOptions"
                            className="form-control"
                            placeholder="Search..."
                          />
                          <datalist id="selectOptions">
                            {customerNames &&
                              customerNames.map((customerName) => (
                                <option key={customerName.id} value={customerName.cname} />
                              ))}
                          </datalist>
                        </div>
                      )}
                    </Field>
                    <ErrorMessage name="cname" component="div" className="alert alert-danger" />
                    <button type="submit" className="btn btn-primary btn-block" disabled={isSubmitting}>
                      Edit Details
                    </button>
                  </div>
                )}
                {isEdit && (
                  <>
                    <div className="form-group">
                      <label>
                        <Field
                          type="radio"
                          name="selectedField"
                          value="creditBalance"
                          checked={selectedField === "creditBalance"}
                          onChange={() => setSelectedField("creditBalance")}
                        />{" "}
                        Credit Balance  (Add amount to balance)
                      </label>
                      <label>
                        <Field
                          type="radio"
                          name="selectedField"
                          value="debitBalance"
                          checked={selectedField === "debitBalance"}
                          onChange={() => setSelectedField("debitBalance")}
                        />{" "}
                        Debit Balance  (Subtract amount from balance)
                      </label>
                      {/* <label>
                        <Field
                          type="radio"
                          name="selectedField"
                          value="totalBalance"
                          checked={selectedField === "totalBalance"}
                          onChange={() => setSelectedField("totalBalance")}
                        />{" "}
                        Total Balance
                      </label> */}
                    </div>

                    <div className="form-group">
                      <label htmlFor="creditBalance">Credit Balance</label>
                      <Field
                        name="creditBalance"
                        type="number"
                        className="form-control"
                        disabled={selectedField !== "creditBalance"}
                      />
                      <ErrorMessage name="creditBalance" component="div" className="alert alert-danger" />
                    </div>

                    <div className="form-group">
                      <label htmlFor="debitBalance">Debit Balance</label>
                      <Field
                        name="debitBalance"
                        type="number"
                        className="form-control"
                        disabled={selectedField !== "debitBalance"}
                      />
                      <ErrorMessage name="debitBalance" component="div" className="alert alert-danger" />
                    </div>

                    <div className="form-group">
                      <label htmlFor="totalBalance">Total Balance</label>
                      <Field
                        name="totalBalance"
                        type="number"
                        className="form-control"
                        disabled
                      />
                      <ErrorMessage name="totalBalance" component="div" className="alert alert-danger" />
                    </div>

                    <button type="submit" className="btn btn-primary btn-block" disabled={isSubmitting}>
                      Update Details
                    </button>
                  </>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>

      {message && (
        <div className="form-group">
          <div className="alert alert-danger" role="alert">
            {message}
          </div>
        </div>
      )}
    </div>
  );
};

export default ModifyBalanceDetails;
