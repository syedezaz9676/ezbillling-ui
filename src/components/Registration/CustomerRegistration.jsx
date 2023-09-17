import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Navigate, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { doCustomerRegistration } from "../redux/ezCustomerRegistrationSlice";
import { clearMessage } from "../redux/message";
import { doGetGstCodeDetails } from "../redux/slices/ezGstCodeDetailsSlice";
const CustomerRegister = () => {
  let navigate = useNavigate();
  const [successful, setSuccessful] = useState(false);

  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(doGetGstCodeDetails())
      .unwrap()
      .then(() => {
        // navigate("/user/dashboard");
        // window.location.reload();
      })
      .catch(() => {
      });
  }, [dispatch]);

  const { GstCodeDetails } = useSelector((state) => state.ezgetGstCodeDetails);

  const initialValues = {
    name: "",
    gstno: "",
    phone: "",
    address: "",
    isigst: "",
    supplyplace: "",



  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .test(
        "len",
        "The name must be between 3 and 20 characters.",
        (val) =>
          val &&
          val.toString().length >= 3 &&
          val.toString().length <= 20
      )
      .required("This field is required!"),
    gstno: Yup.string()
      .test(
        "len",
        "must be a valid 15 digit gst number.",
        (val) =>
          val &&
          val.toString().length == 15
      )
      .required("This Gst Number is required!"),
    phone: Yup.string()
      .test(
        "len",
        "must be a valid 10 digit phone number.",
        (val) =>
          val &&
          val.toString().length == 15
      )
      .required("This phone number is required!"),
    address: Yup.string()
      .required("This Address is required!"),
  });

  const handleRegister = (formValue) => {
    console.log('formValue', formValue)

    const customerDetails = {
      'cname': formValue.name,
      'ctno': formValue.gstno,
      'cpno': formValue.phone,
      'cadd': formValue.address,
      'isigst': formValue.isigst,
      'supplyplace': formValue.supplyplace,
      'legal_name': formValue.name
    }

    setSuccessful(false);

    dispatch(doCustomerRegistration(customerDetails))
      .unwrap()
      .then(() => {
        setSuccessful(true);
        navigate("/about");
      })
      .catch(() => {
        setSuccessful(false);
      });
  };

  return (
    <div className="col-md-12 signup-form">
      <div className="card card-container">
        <h3>Customer Registration</h3>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
        >
          <Form>
            {!successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="name">Customer Name</label>
                  <Field name="name" type="text" className="form-control" />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="gstno">GST Number</label>
                  <Field name="gstno" type="text" className="form-control" />
                  <ErrorMessage
                    name="gstno"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <Field name="phone" type="number" className="form-control" />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <Field name="address" type="text" className="form-control" />
                  <ErrorMessage
                    name="address"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>



                <div className="form-group">
                  <label htmlFor="isigst">Enable IGST</label>
                  <Field as="select" name="isigst" className="form-control">
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </Field>
                </div>

                <div className="form-group">
                  <label htmlFor="supplyplace">Supply Place</label>
                  <Field as="select" name="supplyplace" className="form-control">
                    {GstCodeDetails && GstCodeDetails.map((GstCodeDetail, index) => (
                      <option key={index} value={GstCodeDetail.stateName + ' ' + GstCodeDetail.tno}>
                        {GstCodeDetail.stateName + ' ' + GstCodeDetail.tno}
                      </option>
                    ))}
                  </Field>
                </div>

                <div className="form-group">
                  <button type="submit" className="btn btn-primary btn-block">Save Details</button>
                </div>
              </div>
            )}
          </Form>
        </Formik>
      </div>

      {message && (
        <div className="form-group">
          <div
            className={successful ? "alert alert-success" : "alert alert-danger"}
            role="alert"
          >
            {message}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerRegister;
