import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { getProductDetails } from "../redux/slices/productdetails/ezProductDetailsSlice";
import { getCompanyDetails } from "../redux/slices/companydetails/ezCompanyDetailsSlice";
import { clearMessage } from "../redux/message";
import { useNavigate } from "react-router-dom";
import { ezshowField, ezhideField } from "../redux/slices/ezEnableFiledSlice";
import {
  saveHsnCodeDetails,
  getHsncodes,
} from "../redux/slices/productdetails/ezProductDetailsSlice";
import { hideEdit } from "../redux/slices/ezEnableFiledSlice";

const AddNewHsnCodeDetails = () => {
  const navigate = useNavigate();
  const [successful, setSuccessful] = useState(false);

  const { message } = useSelector((state) => state.message);
  const { productDetails, hsnCodes } = useSelector(
    (state) => state.ezProductDetails
  );
  const { UserDetails } = useSelector((state) => state.ezLogin);
  const { isenable } = useSelector((state) => state.ezEnableField);
  const { companyDeatils } = useSelector((state) => state.ezCompanyDetails);
  const { productDetailsByID } = useSelector((state) => state.ezProductDetails);
  const { isEdit } = useSelector((state) => state.ezEnableField);
  const [gstpercentages, setGstpercentages] = useState([]);
  const formikRef = useRef();

  const userID = UserDetails.user.id;

  console.log("state.ezProductDetails", isenable);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHsncodes())
      .unwrap()
      .then(() => {})
      .catch(() => {});

    dispatch(clearMessage());
  }, [dispatch]);

  const isHsnCodeUnique = (value) => {
    let hsncodes = [];
    hsnCodes.map(
      (hsnCodeDetails, index) => (hsncodes[index] = hsnCodeDetails.hsnCode)
    );
    return isEdit ? true : !hsncodes.includes(value);
  };

  const getHsncode = (hsnCodes) => {
    return hsnCodes.map((hsnCodeDetails) => hsnCodeDetails.hsnCode);
  };

  const validationSchema = Yup.object().shape({
    hsnCode: Yup.string()
      .required("Hsn Code is required!")
      .test("is-unique", "Hsn Code already exists.", isHsnCodeUnique),
      hsnDescription: Yup.string()
      .required("Description is required!"),
      uqc: Yup.string()
      .required("uqc is required!"),
  });

  const editedInitialValues = {
  };
  const createdInitialValues = {
    hsnCode: "",
      hsnDescription: "",
      uqc: "",
  };

  const handleRegister = (formvalues) => {
    const HsnCodeDetails = {
      hsnCode: formvalues.hsnCode,
      hsnDescription: formvalues.hsnDescription,
      uqc: formvalues.uqc,
    };
    // const editHsnCodeDetailss = {};
    // const HsnCodeDetails = isEdit ? editProductDetails : saveintProductDetails;
    // setSuccessful(false);

    dispatch(saveHsnCodeDetails({ HsnCodeDetails }))
      .unwrap()
      .then(() => {
        console.log("on sucess");
        navigate("/dashboard");

        // window.location.reload();
      })
      .catch(() => {
        console.log("on failed");
      });
    // navigate("/dashboard");

    dispatch(hideEdit());
  };

  return (
    <div className="col-md-12 signup-form">
      <div className="card card-container">
        <h3>Add New Hsn Code Details</h3>
        <Formik
          initialValues={false ? editedInitialValues : createdInitialValues}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
          innerRef={formikRef}
        >
          {({ values }) => (
            <Form>
              <div>
                <div className="form-group">
                  <label htmlFor="hsnCode">Hsn Code</label>
                  <Field name="hsnCode" type="text" className="form-control" />
                  <ErrorMessage
                    name="hsnCode"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="hsnDescription">Description</label>
                  <Field
                    name="hsnDescription"
                    type="text"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="hsnDescription"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="uqc">UQC</label>
                  <Field name="uqc" type="text" className="form-control" />
                  <ErrorMessage
                    name="uqc"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <button type="submit" className="btn btn-primary btn-block">
                    Save Details
                  </button>
                </div>
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
  );
};

export default AddNewHsnCodeDetails;
