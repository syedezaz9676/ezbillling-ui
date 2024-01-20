import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import { Navigate, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { clearMessage } from "../redux/message";
import { showEdit } from "../redux/slices/ezEnableFiledSlice";
import { getCustomerDetailsByID, getCustomerNames } from "../redux/ezCustomerRegistrationSlice";
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
        dispatch(getCustomerNames({userID}))
            .unwrap()
            .then(() => {
                // navigate("/dashboard");
                // window.location.reload();
            })
            .catch(() => {
            });

            // dispatch(clearCompanyDetailsByID());
    }, [dispatch]);
    const { customerNames, isgetCustomerDetailsByIDPendng } = useSelector((state) => state.ezCustomerRegistration);

    //   const { GstCodeDetails } = useSelector((state) => state.ezgetGstCodeDetails);

    const initialValues = {
        name: "",
        gstPer: []
    };

    // const validationSchema = Yup.object().shape({
    //     name: Yup.string()
    //         .min(3, 'The name must be at least 3 characters.')
    //         .max(20, 'The name must be at most 20 characters.')
    //         .test('is-unique', 'Company name already exists.', isNameUnique)
    //         .required('Company Name is required.'),
    // });

    const handleRegister = (formValue) => {
        console.log('formValue', formValue);
        const id = formValue.name
        dispatch(getCustomerDetailsByID({id}))
        dispatch(showEdit());

    };

    return (<div>
        { !isEdit && <div className="col-md-12 signup-form">
            <div className="card card-container">
                <h3>Edit Customer details</h3>
                <Formik
                    initialValues={initialValues}
                    // validationSchema={validationSchema}
                    onSubmit={handleRegister}
                >
                    <Form>
                        {/* ... (other form fields) */}
                        <div>
                            <div className="form-group">
                                <label htmlFor="name">Company Name</label>
                                {/* <Field name="name" type="text" className="form-control" />
                                <ErrorMessage
                                    name="name"
                                    component="div"
                                    className="alert alert-danger"
                                /> */}

                                <Field as="select" name="name" className="form-control"
                                ><option>--Please Select--</option>
                                    {customerNames && customerNames.map((customerName, index) => (
                                        <option key={index} value={customerName.id}>
                                            {customerName.cname}
                                        </option>
                                    ))}
                                </Field>
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
                        className={successful ? "alert alert-success" : "alert alert-danger"}
                        role="alert"
                    >
                        {message}
                    </div>
                </div>
            )}

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
        </div>}
        {isEdit && !isgetCustomerDetailsByIDPendng && <CustomerRegister/>}
        </div>
    );
};

export default EditCustomerDetails;