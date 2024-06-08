import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Navigate, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { doCustomerRegistration } from "../redux/ezCustomerRegistrationSlice";
import { clearMessage } from "../redux/message";
import { doGetGstCodeDetails } from "../redux/slices/ezGstCodeDetailsSlice";
import { hideEdit } from "../redux/slices/ezEnableFiledSlice";
import { getCustomerNames } from "../redux/ezCustomerRegistrationSlice";

const CustomerRegister = () => {
  let navigate = useNavigate();
  const [successful, setSuccessful] = useState(false);
  const { UserDetails } = useSelector((state) => state.ezLogin);
  
  
  const { customerNames } = useSelector((state) => state.ezCustomerRegistration);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  const userID = UserDetails.user.id;

  useEffect(() => {
    dispatch(doGetGstCodeDetails())
      .unwrap()
      .then(() => {
        // navigate("/user/dashboard");
        // window.location.reload();
      })
      .catch(() => {
      });

    
      dispatch(getCustomerNames({userID}))
      .unwrap()
      .then(() => {
        // navigate("/user/dashboard");  
        // window.location.reload();
      })
      .catch(() => {
      });
  }, [dispatch]);

  const { GstCodeDetails } = useSelector((state) => state.ezgetGstCodeDetails);
  const { customerDetailsByID } = useSelector((state) => state.ezCustomerRegistration);
  const {isEdit } = useSelector((state) => state.ezEnableField);

   const phoneNo= isEdit && customerDetailsByID?customerDetailsByID.cpno:'';
  const editedInitialValues = {
    id:isEdit && customerDetailsByID?customerDetailsByID.id:'',
    name: isEdit && customerDetailsByID?customerDetailsByID.cname:'',
    gstno: isEdit && customerDetailsByID?customerDetailsByID.ctno:'',
    phone: isEdit && customerDetailsByID?Number(phoneNo):'',
    address: isEdit && customerDetailsByID?customerDetailsByID.cadd:'',
    isigst: isEdit && customerDetailsByID?customerDetailsByID.isigst:'',
    supplyplace: isEdit && customerDetailsByID?customerDetailsByID.supplyplace:'',
    dgst:isEdit && customerDetailsByID?customerDetailsByID.dgst:''
  };

  const initialValues = {
    name: "",
    gstno: "",
    phone: "",
    address: "",
    isigst: "",
    supplyplace: "",
    dgst:UserDetails.user.id
  };


  const isNameUnique = (value) => {
    console.log("in isnameunique", customerNames)
    let names = [];
    customerNames.map((customerName, index) => (
        console.log("customerName.name", customerName.cname),
        names[index] = customerName.cname
    ))
    console.log("names", names)
    return isEdit? true:!names.includes(value);
};
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .test(
        "len",
        "The name must be between 0 and 30 characters.",
        (val) =>
          val &&
          val.toString().length >= 0 &&
          val.toString().length <= 30
      )
      .test('is-unique', 'Customer name already exists.', isNameUnique)
      .required("This field is required!"),
    // gstno: Yup.string()
    //   .test(
    //     "len",
    //     "must be a valid 15 digit gst number.",
    //     (val) =>
    //       val &&
    //       val.toString().length == 15
    //   )
    //   .required("This Gst Number is required!"),
    phone: Yup.string()
      .test(
        "len",
        "must be a valid 10 digit phone number.",
        (val) =>
          val &&
          val.toString().length == 10
      )
      .required("This phone number is required!"),
    address: Yup.string()
      .required("This Address is required!"),
    isigst: Yup.string()
      .test(
        "is-not-empty",
        "Please select valid IGST",
        (val) => val && val.trim() !== "--Please Select---"
      )
      .required("This enable IGST is required!"),
    supplyplace: Yup.string()
      .test(
        "is-not-empty",
        "Please select valid Supply Place",
        (val) => val && val.trim() !== "--Please Select---"
      )
      .required("This Supply Place is required!"),
  });

  const handleRegister = (formValue) => {
    console.log('formValue', formValue)

    const editedCustomerDetails = {
      "id":customerDetailsByID.id,
      'cname': formValue.name,
      'ctno': formValue.gstno,
      'cpno': formValue.phone,
      'cadd': formValue.address,
      'isigst': formValue.isigst,
      'supplyplace': formValue.supplyplace,
      'legal_name': formValue.name,
      'dgst': UserDetails.user.id,
      'isEdit':true
    }

    const createdCustomerDetails = {
      'cname': formValue.name,
      'ctno': formValue.gstno,
      'cpno': formValue.phone,
      'cadd': formValue.address,
      'isigst': formValue.isigst,
      'supplyplace': formValue.supplyplace,
      'legal_name': formValue.name,
      'dgst': UserDetails.user.id,
      'isEdit':false
    }

    setSuccessful(false);
   const customerDetails = isEdit?editedCustomerDetails:createdCustomerDetails
    dispatch(doCustomerRegistration({ customerDetails }))
      .unwrap()
      .then(() => {
        setSuccessful(true);
        navigate("/dashboard");
      })
      .catch(() => {
        setSuccessful(false);
      });

      dispatch(hideEdit()) 
  };

  return (
    <div className="col-md-12 signup-form">
      <div className="card card-container">
        <h3>Customer Registration</h3>
        <Formik
          initialValues={isEdit?editedInitialValues:initialValues}
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
                  {isEdit?<option  value={customerDetailsByID?customerDetailsByID.isigst:''}>{customerDetailsByID.isigst}</option>:<option>--Please Select---</option>}
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </Field>
                  <ErrorMessage
                    name="isigst"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="supplyplace">Supply Place</label>
                  <Field as="select" name="supplyplace" className="form-control">
                    {isEdit?<option  value={customerDetailsByID?customerDetailsByID.supplyplace:''}>{customerDetailsByID.supplyplace}</option>:<option>--Please Select---</option>}
                    {GstCodeDetails && GstCodeDetails.map((GstCodeDetail, index) => (
                      <option key={index} value={GstCodeDetail.stateName + '-' + GstCodeDetail.tno}>
                        {GstCodeDetail.stateName + '-' + GstCodeDetail.tno}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="supplyplace"
                    component="div"
                    className="alert alert-danger"
                  />
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
