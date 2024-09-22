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
  saveProductDetails,
  getHsncodes,
} from "../redux/slices/productdetails/ezProductDetailsSlice";
import { hideEdit } from "../redux/slices/ezEnableFiledSlice";

const ProductRegistration = () => {
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
    dispatch(getProductDetails({ userID }))
      .unwrap()
      .then(() => {})
      .catch(() => {});

    dispatch(getCompanyDetails({ userID }))
      .unwrap()
      .then(() => {})
      .catch(() => {});

    dispatch(getHsncodes())
      .unwrap()
      .then(() => {})
      .catch(() => {});

    dispatch(clearMessage());
  }, [dispatch]);

  const isNameUnique = (value) => {
    let names = [];
    productDetails.map(
      (productDetail, index) => (names[index] = productDetail.pname)
    );
    console.log("names", names);
    return isEdit ? true : !names.includes(value);
  };

  const getHsncode = (hsnCodes) => {
    return hsnCodes.map((hsnCodeDetails) => hsnCodeDetails.hsnCode);
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Product Name is required!")
      .test("is-unique", "Product name already exists.", isNameUnique),
    mrp: Yup.number()
      .min(0, "MRP must be a positive number")
      .required("MRP is required!"),
    rate: Yup.number()
      .min(0, "Rate must be a positive number")
      .required("Rate is required!"),
    productcompany: Yup.string()
      .test(
        "is-not-empty",
        "Please select valid Company Name",
        (val) => val && val.trim() !== "--Please Select---"
      )
      .required("Product Company is required!"),
    gstPer: Yup.number()
      // .test(
      //   "is-not-empty",
      //   "Please select valid gst percentage",
      //   (val) => val && val.trim() !== "--Please Select---"
      // )
      .min(0, "GST Percentage must be a positive number")
      .required("GST Percentage is required!"),
    hsn_code: Yup.string()
      .required("HSN Code is required!")
      .test("is-valid-hsncode", "Select valid Hsn Code", function (value) {
        return getHsncode(hsnCodes).includes(value);
      }),
    unitesper: Yup.string().required("Units per is required!"),
    noofunites: Yup.number()
      .min(0, "Number of Units must be a positive number")
      .required("Number of Units is required!"),
    is_sp: Yup.boolean(),
    // rel_prod: Yup.string()
    // .test(
    //   "is-not-empty",
    //   "Please select valid related product",
    //   (val) => val && val.trim() !== "--Please Select---"
    // )
    // .required("Rate is required!"),
  });

  const editedInitialValues = {
    id: isEdit ? productDetailsByID.id : "",
    name: isEdit ? productDetailsByID.pname : "",
    mrp: isEdit ? productDetailsByID.mrp : "",
    rate: isEdit ? productDetailsByID.rate : "",
    productcompany: isEdit ? productDetailsByID.pcom : "",
    gstPer: isEdit ? productDetailsByID.vatp : "",
    hsn_code: isEdit ? productDetailsByID.hsn_code : "",
    unitesper: isEdit ? productDetailsByID.unites_per : "",
    noofunites: isEdit ? productDetailsByID.no_of_unites : "",
    is_sp: isEdit ? productDetailsByID.is_sp : "",
    rel_prod: isEdit ? productDetailsByID.rel_prod : "",
    description: isEdit ? productDetailsByID.description : "",
    cess: isEdit ? productDetailsByID.cess : "",
    uqc: isEdit ? productDetailsByID.dgst : "",
  };
  console.log("editedInitialValues", editedInitialValues);
  const createdInitialValues = {
    name: "",
    mrp: "",
    rate: "",
    productcompany: "",
    gstPer: "",
    hsn_code: "",
    unitesper: "",
    noofunites: "",
    is_sp: false,
    rel_prod: "",
    description: "",
    cess: 0,
    uqc: "",
    isEdit: false,
  };

  const handleRegister = (formvalues) => {
    console.log("formvalues", formvalues);

    const saveintProductDetails = {
      pname: formvalues.name,
      mrp: formvalues.mrp,
      rate: formvalues.rate,
      pcom: formvalues.productcompany,
      vatp: formvalues.gstPer,
      hsn_code: formvalues.hsn_code,
      unites_per: formvalues.unitesper,
      no_of_unites: formvalues.noofunites,
      is_sp: formvalues.is_sp,
      rel_prod: formvalues.rel_prod,
      cess: formvalues.cess,
      dgst: userID,
      isEdit: false,
    };
    const editProductDetails = {
      id: isEdit ? productDetailsByID.id : "",
      pname: formvalues.name,
      mrp: formvalues.mrp,
      rate: formvalues.rate,
      pcom: formvalues.productcompany,
      vatp: formvalues.gstPer,
      hsn_code: formvalues.hsn_code,
      unites_per: formvalues.unitesper,
      no_of_unites: formvalues.noofunites,
      is_sp: formvalues.is_sp,
      rel_prod: formvalues.rel_prod,
      cess: formvalues.cess,
      dgst: userID,
      isEdit: true,
    };
    const productDetails = isEdit ? editProductDetails : saveintProductDetails;
    setSuccessful(false);
    // dispatch(saveProductDetails({productDetails}))
    //   .unwrap()
    //   .then(() => {
    //     setSuccessful(true);
    //     navigate("/dashboard");
    //   })
    //   .catch(() => {
    //     setSuccessful(false);
    //     // navigate("/dashboard");
    //   });

    dispatch(saveProductDetails({ productDetails }))
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
        <h3>Product Registration</h3>
        <Formik
          initialValues={isEdit ? editedInitialValues : createdInitialValues}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
          innerRef={formikRef}
        >
          {({ values }) => (
            <Form>
              {!successful && (
                <div>
                  <div className="form-group">
                    <label htmlFor="name">Product Name</label>
                    <Field name="name" type="text" className="form-control" />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="mrp">MRP</label>
                    <Field name="mrp" type="number" className="form-control" />
                    <ErrorMessage
                      name="mrp"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="rate">Rate</label>
                    <Field name="rate" type="number" className="form-control" />
                    <ErrorMessage
                      name="rate"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="productcompany">Product Company</label>
                    <Field
                      // isSearchable={true}
                      as="select"
                      // component={Select}
                      name="productcompany"
                      className="form-control"
                      onChange={(e) => {
                        const selectedCompany = e.target.value;
                        formikRef.current.setFieldValue(
                          "productcompany",
                          selectedCompany
                        );

                        companyDeatils.map((companyDeatil) =>
                          companyDeatil.name === e.target.value
                            ? setGstpercentages(companyDeatil.gstPercentage)
                            : null
                        );

                        console.log("gstpercentages", gstpercentages);

                        console.log(
                          "Product Company changed to:",
                          e.target.value
                        );
                      }}
                      // options={companyDeatils && companyDeatils.map((companyDeatil) => ({
                      //   value: companyDeatil.name,
                      //   label: companyDeatil.name,
                      // }))}
                    >
                      <option>--Please Select--</option>
                      {companyDeatils &&
                        companyDeatils.map((companyDeatil, index) => (
                          <option key={index} value={companyDeatil.name}>
                            {companyDeatil.name}
                          </option>
                        ))}
                    </Field>
                  </div>

                  <div className="form-group">
                    <label htmlFor="gstPer">GST Percentage</label>
                    <Field as="select" name="gstPer" className="form-control">
                      {isEdit ? (
                        <option
                          value={
                            productDetailsByID ? productDetailsByID.vatp : ""
                          }
                        >
                          {productDetailsByID.vatp}
                        </option>
                      ) : (
                        <option>--Please Select---</option>
                      )}
                      {gstpercentages &&
                        gstpercentages.map((gstpercentage, index) => (
                          <option key={index} value={gstpercentage}>
                            {gstpercentage}
                          </option>
                        ))}
                    </Field>
                    <ErrorMessage
                      name="gstPer"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cess">Cess</label>
                    <Field
                      name="cess"
                      type="number"
                      className="form-control"
                      defaultValue={0}
                    />
                    <ErrorMessage
                      name="cess"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="name">HSN Code</label>
                    <Field name="hsn_code">
                      {({ field, form }) => (
                        <div>
                          <input
                            type="text"
                            {...field}
                            list="selectOptions"
                            className="form-control"
                            placeholder="Search..."
                            defaultValue="select"
                          />
                          <datalist id="selectOptions">
                            {hsnCodes &&
                              hsnCodes.map((hsnCode, index) => (
                                <option
                                  key={hsnCode.hsnCode}
                                  value={hsnCode.hsnCode}
                                />
                              ))}
                          </datalist>
                        </div>
                      )}
                    </Field>
                    <ErrorMessage
                      name="hsn_code"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="unitesper">Units per</label>
                    <Field
                      name="unitesper"
                      type="text"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="unitesper"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="noofunites">Number of Units</label>
                    <Field
                      name="noofunites"
                      type="number"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="noofunites"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="is_sp">Is Special Product?</label>
                    <Field
                      name="is_sp"
                      as="select"
                      className="form-control"
                      onChange={(e) => {
                        console.log("e.target.value", e.target.value);
                        formikRef.current.setFieldValue(
                          "is_sp",
                          e.target.value
                        );
                        const val = e.target.value.toString();
                        if (val === "false") {
                          formikRef.current.setFieldValue("rel_prod", "");
                        }
                        val === "true"
                          ? console.log(
                              "e.target.value is true",
                              e.target.value
                            )
                          : console.log(
                              "e.target.value is false",
                              e.target.value
                            );
                        val === "true"
                          ? dispatch(ezshowField())
                          : dispatch(ezhideField());
                      }}
                    >
                      {isEdit ? (
                        <option
                          value={
                            productDetailsByID ? productDetailsByID.is_sp : ""
                          }
                        >
                          {productDetailsByID.is_sp}
                        </option>
                      ) : (
                        <option>--Please Select---</option>
                      )}
                      <option value={false}>No</option>
                      <option value={true}>Yes</option>
                    </Field>
                    <ErrorMessage
                      name="is_sp"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  {isenable && (
                    <div className="form-group">
                      <label htmlFor="rel_prod">Related Product</label>
                      <Field
                        as="select"
                        name="rel_prod"
                        className="form-control"
                        disabled={!values.is_sp}
                      >
                        {" "}
                        {isEdit ? (
                          <option
                            value={
                              productDetailsByID
                                ? productDetailsByID.rel_prod
                                : ""
                            }
                          >
                            {productDetailsByID.rel_prod}
                          </option>
                        ) : (
                          <option>--Please Select---</option>
                        )}
                        {values.is_sp &&
                          productDetails &&
                          productDetails.map((productDetail, index) => (
                            <option key={index} value={productDetail.pname}>
                              {productDetail.pname}
                            </option>
                          ))}
                      </Field>
                      <ErrorMessage
                        name="rel_prod"
                        component="div"
                        className="alert alert-danger"
                      />
                    </div>
                  )}
                  <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-block">
                      Save Details
                    </button>
                  </div>
                </div>
              )}
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

export default ProductRegistration;
