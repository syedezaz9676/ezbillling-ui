import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import { Navigate, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { getInvoiceDetails } from "../redux/slices/billingDetails/ezBillingDetailsSlice";
import Invoice from "./Invoice";
import { showBill } from "../redux/slices/ezEnableFiledSlice"; 

// ... (previous imports)

const ViewInvoice = () => {
    let navigate = useNavigate();
    const { UserDetails } = useSelector((state) => state.ezLogin);
    const dispatch = useDispatch();
    const { message } = useSelector((state) => state.message);
    const [successful, setSuccessful] = useState(false);
    const [billno, setBillno] = useState(null);
    const { isshowBill } = useSelector((state) => state.ezEnableField);
    // let billno=null;

    const userID = UserDetails.user.id;
    useEffect(() => {
    }, [dispatch]);
    // const {isgetInvoiceDetailsSucess, InvoiceDetailsByInvoiceNo } = useSelector((state) => state.ezInvoiceDetails);

    const initialValues = {
        name: "",
        gstPer: []
    };

    const handleRegister = (formValue) => {
        console.log('formValue', formValue);
        setBillno(formValue.InvoiceNo)
        dispatch(showBill());
        
    };

    return (<div>
        { !isshowBill && <div className="col-md-12 signup-form">
            <div className="card card-container">
                <h3>Edit Invoice</h3>
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleRegister}
                >
                    <Form>
                        <div>
                            <div className="form-group">
                                <label htmlFor="InvoiceNo">Enter Invocie No</label>
                                <Field name="InvoiceNo" type="text" className="form-control" />
                                <ErrorMessage
                                    name="InvoiceNo"
                                    component="div"
                                    className="alert alert-danger"
                                />
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
        { isshowBill && <Invoice viewInvoicebyno= {{billno}}/>}
        </div>
        
    );
};

export default ViewInvoice;