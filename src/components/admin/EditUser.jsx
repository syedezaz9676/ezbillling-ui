import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import { Navigate, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { getUsers, getUser } from "../redux/slices/billingDetails/ezBillingDetailsSlice";
import { showEdit } from "../redux/slices/ezEnableFiledSlice";
import AddUsers from "./AddUsers";

// ... (previous imports)

const EditUser = () => {
    const { UserDetails } = useSelector((state) => state.ezLogin);
    const dispatch = useDispatch();
    const { message } = useSelector((state) => state.message);
    const [successful, setSuccessful] = useState(false);
    const { isEdit } = useSelector((state) => state.ezEnableField);
    

    const userID = UserDetails.user.id;
    useEffect(() => {
        dispatch(getUsers())
            .unwrap()
            .then(() => {
                // navigate("/dashboard");
                // window.location.reload();
            })
            .catch(() => {
            });
    }, [dispatch]);
    const { User,Users,isUserPending } = useSelector((state) => state.ezInvoiceDetails);
    const { companyNames, isgetCompanyDetailsByIDPending } = useSelector((state) => state.ezCompanyDetails);

    //   const { GstCodeDetails } = useSelector((state) => state.ezgetGstCodeDetails);

    const initialValues = {
        username: ""
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
        const userName = formValue.username
        dispatch(getUser({userName}))
        console.log('hr', formValue);
        dispatch(showEdit());

    };

    return (<div>
        { !isEdit && <div className="col-md-12 signup-form">
            <div className="card card-container">
                <h3>Edit User</h3>
                <Formik
                    initialValues={initialValues}
                    // validationSchema={validationSchema}
                    onSubmit={handleRegister}
                >
                    <Form>
                        {/* ... (other form fields) */}
                        <div>
                            <div className="form-group">
                                <label htmlFor="username">UserName</label>
                                {/* <Field name="name" type="text" className="form-control" />
                                <ErrorMessage
                                    name="name"
                                    component="div"
                                    className="alert alert-danger"
                                /> */}

                                <Field as="select" name="username" className="form-control"
                                ><option>--Please Select--</option>
                                    {Users && Users.map((user, index) => (
                                        <option key={index} value={user.username}>
                                            {user.username}
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
        {isEdit && !isUserPending && <AddUsers/>}
        </div>
    );
};

export default EditUser;