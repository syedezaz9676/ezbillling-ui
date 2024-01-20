import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import { Navigate, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { clearMessage } from "../redux/message";
import { showEdit } from "../redux/slices/ezEnableFiledSlice";
import { getCompanyNames } from "../redux/slices/companydetails/ezCompanyDetailsSlice";
import { getProductNames, getProductDetailsByID, getProductDetailsByCompany } from "../redux/slices/productdetails/ezProductDetailsSlice";
import ProductRegistration from "./ProductRegistration ";

// ... (previous imports)

const EditProductDetails = () => {
    const formikRef = useRef();
    const { UserDetails } = useSelector((state) => state.ezLogin);
    const dispatch = useDispatch();
    const { message } = useSelector((state) => state.message);
    const [successful, setSuccessful] = useState(false);
    const { isEdit } = useSelector((state) => state.ezEnableField);
    const { companyNames } = useSelector((state) => state.ezCompanyDetails);

    const userID = UserDetails.user.id;
    useEffect(() => {
        dispatch(getCompanyNames({ userID }))
            .unwrap()
            .then(() => {
                // navigate("/dashboard");
                // window.location.reload();
            })
            .catch(() => {
            });

        // dispatch(clearCompanyDetailsByID());
    }, [dispatch]);
    const { productNames, isgetProductDetailsByIDPending, productDetailsByCompany } = useSelector((state) => state.ezProductDetails);

    //   const { GstCodeDetails } = useSelector((state) => state.ezgetGstCodeDetails);

    const initialValues = {
        name: "",
        product: ""
    };

    const validationSchema = Yup.object().shape({
        product: Yup.string()
            .test(
                "is-not-empty",
                "Please select Product",
                (val) => val && val.trim() !== "--Please Select---"
            ),

            name: Yup.string()
            .test(
                "is-not-empty",
                "Please select Company",
                (val) => val && val.trim() !== "--Please Select---"
            )
    });

    const handleRegister = (formValue) => {
        console.log('formValue', formValue);
        const id = formValue.product
        dispatch(getProductDetailsByID({ id }))
        dispatch(showEdit());

    };
    const handleOnChange = (e) => {

        formikRef.current.setFieldValue(
            "product",
            ''
        );
        formikRef.current.setFieldValue(
            "name",
            e.target.value
        );

        const cName = e.target.value;
        dispatch(getProductDetailsByCompany({ cName }))
    }
    return (<div>
        {!isEdit && <div className="col-md-12 signup-form">
            <div className="card card-container">
                <h3>Edit Product details</h3>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleRegister}
                    innerRef={formikRef}
                >
                    <Form>
                        {/* ... (other form fields) */}
                        <div>
                            <div className="form-group">
                                <label htmlFor="name">Select Company Name</label>
                                {/* <Field name="name" type="text" className="form-control" />
                                <ErrorMessage
                                    name="name"
                                    component="div"
                                    className="alert alert-danger"
                                /> */}

                                <Field as="select" name="name" className="form-control" onChange={(e) => handleOnChange(e)} >
                                    <option>--Please Select--</option>
                                    {companyNames && companyNames.map((companyName, index) => (
                                        <option key={index} value={companyName.name}>
                                            {companyName.name}
                                        </option>
                                    ))}
                                </Field>
                                <ErrorMessage
                                    name="name"
                                    component="div"
                                    className="alert alert-danger"
                                />
                                <label htmlFor="product">Select Product Name</label>
                                <Field as="select" name="product" className="form-control"
                                ><option>--Please Select--</option>
                                    {productDetailsByCompany && productDetailsByCompany.map((productDetails, index) => (
                                        <option key={index} value={productDetails._id}>
                                            {productDetails.pname}
                                        </option>
                                    ))}
                                </Field>
                                <ErrorMessage
                                    name="product"
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
        {isEdit && !isgetProductDetailsByIDPending && <ProductRegistration />}
    </div>
    );
};

export default EditProductDetails;