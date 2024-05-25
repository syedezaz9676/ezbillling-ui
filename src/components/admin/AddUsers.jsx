import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import { Navigate, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { doCustomerRegistration } from "../redux/ezCustomerRegistrationSlice";
import { clearMessage } from "../redux/message";
import { saveUser,getUsers } from "../redux/slices/billingDetails/ezBillingDetailsSlice";
import { hideEdit } from "../redux/slices/ezEnableFiledSlice";
import { getCustomerNames } from "../redux/ezCustomerRegistrationSlice";

const AddUsers = () => {
  let navigate = useNavigate();
  const [successful, setSuccessful] = useState(false);
  const { UserDetails } = useSelector((state) => state.ezLogin);

  const { customerNames } = useSelector(
    (state) => state.ezCustomerRegistration
  );
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  const userID = UserDetails.user.id;

  useEffect(() => {
    dispatch(getUsers())
      .unwrap()
      .then(() => {
        // navigate("/user/dashboard");
        // window.location.reload();
      })
      .catch(() => {
      });
  }, []);
  const { User,Users } = useSelector((state) => state.ezInvoiceDetails);
  const { isEdit } = useSelector((state) => state.ezEnableField);

  const editedInitialValues = {

      username: isEdit && User ? User.username : "",
      password: isEdit && User ? User.password : "",
      role: isEdit && User ? User.role : [],
      prefix:isEdit && User ? User.prefix : "",
      address: isEdit && User ? User.address : "",
      firmName: isEdit && User ? User.firmName : "",
      gstNo: isEdit && User ? User.gstNo : "",
      contact:isEdit && User ? User.contact : "",
      state: isEdit && User ? User.state : "",
      vehicalNo: isEdit && User ? User.vehicalNo : ""
  };

  const initialValues = {
    username: "",
      password: "",
      role: "",
      prefix: "",
      address: "",
      firmName: "",
      gstNo: "",
      contact: "",
      state: "",
      vehicalNo:""
  };
  const editRoleList = [];

  const isUserNameUnique = (value) => {
    let username = [];
    Users.map(
      (User, index) => (
        (username[index] = User.username)
      )
    );
    
    return isEdit ? true : !username.includes(value);
  };

  const isFirmNameUnique = (value) => {
    let firmName = [];
    Users.map(
      (User, index) => (
        (firmName[index] = User.firmName)
      )
    );
    return isEdit ? true : !firmName.includes(value);
  };
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .test(
        "len",
        "The name must be between 0 and 30 characters.",
        (val) =>
          val && val.toString().length >= 0 && val.toString().length <= 30
      )
      .test("is-unique", "Customer name already exists.", isUserNameUnique)
      .required("This field is required!"),
      firmName: Yup.string()
      .test(
        "len",
        "The name must be between 0 and 30 characters.",
        (val) =>
          val && val.toString().length >= 0 && val.toString().length <= 30
      )
      .test("is-unique", "Customer name already exists.", isFirmNameUnique)
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
    contact: Yup.string()
      .test(
        "len",
        "must be a valid 10 digit phone number.",
        (val) =>
          val &&
          val.toString().length == 10
      )
      .required("This phone number is required!"),
    address: Yup.string().required("This Address is required!"),
    password: Yup.string().required("This Password is required!"),
    gstNo: Yup.string().required("This GST Number is required!"),
    state: Yup.string().required("This State is required!"),
    prefix: Yup.string().required("This Prefix is required!"),
    role: Yup.array()
      .required("Role is required!"),
  });
  const [roleList, setRoleList] = useState(isEdit && User ? User.role : [""]);
  const handleAddPlayers = () => {
    setRoleList([...roleList, ""]); // Add a new empty GST Percentage field
};

const handleRemovePlayers = (index) => {
    const updatedRoleList = [...roleList];
    updatedRoleList.splice(index, 1);
    setRoleList(updatedRoleList);
};

  const handleRegister = (formValue) => {
    console.log("formValue", formValue);

    const editedCustomerDetails = {
      username: formValue.username,
      password: formValue.password,
      role: formValue.role,
      prefix: formValue.prefix,
      address: formValue.address,
      firmName: formValue.firmName,
      gstNo: formValue.gstNo,
      contact: formValue.contact,
      state: formValue.state,
      vehicalNo:formValue.vehicalNo
    };

    const createdCustomerDetails = {
      username: formValue.username,
      password: formValue.password,
      role: formValue.role,
      prefix: formValue.prefix,
      address: formValue.address,
      firmName: formValue.firmName,
      gstNo: formValue.gstNo,
      contact: formValue.contact,
      state: formValue.state,
      vehicalNo:formValue.vehicalNo
    };

    setSuccessful(false);
    const userDetails = isEdit
      ? editedCustomerDetails
      : createdCustomerDetails;
    dispatch(saveUser({ user: userDetails}))
      .unwrap()
      .then(() => {
        setSuccessful(true);
        navigate("/dashboard");
      })
      .catch(() => {
        setSuccessful(false);
      });

    dispatch(hideEdit());
  };

  return (
    <div className="col-md-12 signup-form">
      <div className="card card-container">
        <h3>{isEdit?"Edit User Details":"Add User Details"}</h3>
        <Formik
          initialValues={isEdit ? editedInitialValues : initialValues}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
        >
          <Form>
            {!successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="username">User Name</label>
                  <Field name="username" type="text" className="form-control" />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Field
                    name="password"
                    type="password"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="firmName">Firm Name</label>
                  <Field name="firmName" type="text" className="form-control" />
                  <ErrorMessage
                    name="firmName"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="gstNo">GST Number</label>
                  <Field name="gstNo" type="text" className="form-control" />
                  <ErrorMessage
                    name="gstNo"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>
                <button
                  variant="primary"
                  type="button"
                  onClick={() => handleAddPlayers()}
                  className="btn btn-primary btn-block"
                >
                  Add Another Role
                </button>
                <FieldArray
                  name="gstPer"
                  render={(arrayHelpers) => (
                    <>
                      {roleList &&
                        roleList.map((_, index) => (
                          <div key={index}>
                            <div className="form-group">
                              <label htmlFor={`role[${index}]`}>
                                Role
                              </label>
                              <Field
                                name={`role[${index}]`}
                                as="select"
                                className="form-control"
                              >
                                <option value="">Select...</option>
                                <option value="ROLE_ADMIN">Admin</option>
                                <option value="user">User</option>
                              </Field>
                              <ErrorMessage
                                name={`role[${index}]`}
                                component="div"
                                className="text-danger"
                              />
                            </div>
                            <div className="form-group">
                              <button
                                className="btn btn-primary btn-block"
                                type="button"
                                onClick={() => {
                                  handleRemovePlayers(index);
                                  arrayHelpers.remove(index);
                                }}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        ))}
                    </>
                  )}
                />
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
                  <label htmlFor="prefix">Prefix</label>
                  <Field name="prefix" type="text" className="form-control" />
                  <ErrorMessage
                    name="prefix"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contact">Contact No</label>
                  <Field name="contact" type="number" className="form-control" />
                  <ErrorMessage
                    name="contact"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="state">State</label>
                  <Field name="state" type="text" className="form-control" />
                  <ErrorMessage
                    name="state"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="vehicalNo">Vehical No</label>
                  <Field name="vehicalNo" type="text" className="form-control" />
                  <ErrorMessage
                    name="vehicalNo"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>
                <div className="form-group">
                  <button type="submit" className="btn btn-primary btn-block">
                    Save User
                  </button>
                </div>
              </div>
            )}
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
    </div>
  );
};

export default AddUsers;
