import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form } from "formik";
import { getCompanyDetailsByID, getCompanyNames, clearCompanyDetailsByID, enableEdit, deActivateCompany } from "../redux/slices/companydetails/ezCompanyDetailsSlice";
import CompanyRegistration from "./CompanyRegistration";
import { showEdit } from "../redux/slices/ezEnableFiledSlice";

const EditCompanyDetails = () => {
    const { UserDetails } = useSelector((state) => state.ezLogin);
    const dispatch = useDispatch();
    const { message } = useSelector((state) => state.message);
    const [successful, setSuccessful] = useState(false);
    const { isEdit } = useSelector((state) => state.ezEnableField);

    const userID = UserDetails.user.id;

    useEffect(() => {
        dispatch(getCompanyNames({ userID }))
            .unwrap()
            .catch(() => {});
        dispatch(clearCompanyDetailsByID());
    }, [dispatch, userID]);

    const { companyNames, isgetCompanyDetailsByIDPending } = useSelector((state) => state.ezCompanyDetails);

    const initialValues = {
        name: "",
        gstPer: [],
    };

    const handleRegister = (formValue) => {
        const id = formValue.name;
        dispatch(getCompanyDetailsByID({ id }));
        dispatch(showEdit());
        dispatch(enableEdit());
    };

    const handleDeactivate = (name, resetForm) => {
        if (window.confirm(`Are you sure you want to deactivate the company?`)) {
            const id = name; // Here name holds the company ID
            dispatch(deActivateCompany({ id }))
                .unwrap()
                .then(() => {
                    resetForm();
                    setSuccessful(true);
                })
                .catch(() => {
                    setSuccessful(false);
                });
        }
    };

    return (
        <div>
            {!isEdit && (
                <div className="col-md-12 signup-form">
                    <div className="card card-container">
                        <h3>Edit Company</h3>
                        <Formik
                            initialValues={initialValues}
                            onSubmit={handleRegister}
                        >
                            {({ resetForm, values }) => (
                                <Form>
                                    <div className="form-group">
                                        <label htmlFor="name">Company Name</label>
                                        <Field
                                            as="select"
                                            name="name"
                                            className="form-control"
                                        >
                                            <option>--Please Select--</option>
                                            {companyNames &&
                                                companyNames.map((companyName, index) => (
                                                    <option key={index} value={companyName.id}>
                                                        {companyName.name}
                                                    </option>
                                                ))}
                                        </Field>

                                        <button type="submit" className="btn btn-primary btn-block" style={{ marginRight: "10px" }}>
                                            Edit Details
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-danger btn-block"
                                            onClick={() => handleDeactivate(values.name, resetForm)}
                                        >
                                            Deactivate Company
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>

                    {message && (
                        <div className="form-group">
                            <div className={successful ? "alert alert-success" : "alert alert-danger"} role="alert">
                                {message}
                            </div>
                        </div>
                    )}
                </div>
            )}
            {isEdit && !isgetCompanyDetailsByIDPending && <CompanyRegistration />}
        </div>
    );
};

export default EditCompanyDetails;
