import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { showEdit } from "../redux/slices/ezEnableFiledSlice";
import { getCompanyNames } from "../redux/slices/companydetails/ezCompanyDetailsSlice";
import {
  getProductDetailsByCompany,
} from "../redux/slices/productdetails/ezProductDetailsSlice";
import { getProductSalesMonthly } from "../redux/slices/billingDetails/ezBillingDetailsSlice";
import ProductMonthlySalesAmountAndQtyGraph from "./ProductMonthlySalesAmountAndQtyGraph";

const ProductMonthlySalesGraph = () => {
  const formikRef = useRef();
  const dispatch = useDispatch();
  const { UserDetails } = useSelector((state) => state.ezLogin);
  const { isEdit } = useSelector((state) => state.ezEnableField);
  const { companyNames } = useSelector((state) => state.ezCompanyDetails);
  const { productDetailsByCompany } = useSelector((state) => state.ezProductDetails);
  const { productSaleQtyMonthly,isgetProductSaleQtyMonthlySucess } = useSelector((state) => state.ezInvoiceDetails);
  const [selectedProductName, setSelectedProductName] = useState("");
  const [selectedMonths, setSelectedMonths] = useState("");

  const userID = UserDetails.user.id;

  useEffect(() => {
    dispatch(getCompanyNames({ userID }))
      .unwrap()
      .catch(() => {});
  }, [dispatch, userID]);

  const initialValues = {
    name: "",       // Default to empty string
  product: "",    // Default to empty string
  productKey: "", // Default to empty string
  noOfMonths: "", // Default to empty string
  };

  const validationSchema = Yup.object().shape({
    product: Yup.string().test(
      "is-not-empty",
      "Please select Product",
      (val) => val && val.trim() !== "--Please Select--"
    ),
    name: Yup.string().test(
      "is-not-empty",
      "Please select Company",
      (val) => val && val.trim() !== "--Please Select--"
    ),
    noOfMonths: Yup.number()
      .typeError("Number of months must be a valid number")
      .required("Please enter the number of months"),
  });

  const handleGetGraph = (formValue) => {
    
    const { noOfMonths, product, name, productKey } = formValue;
    setSelectedMonths(noOfMonths);
    const details = {
      productCompany: name,
      productName: productKey,
      noOfMonths: noOfMonths,
    };

    dispatch(getProductSalesMonthly({ details }));
    dispatch(showEdit());
  };

  const handleCompanyChange = (e) => {
    
    const selectedCompanyName = e.target.value || ""; // Ensure no undefined value
    formikRef.current.setFieldValue("product", "");  // Clear product field on company change
    formikRef.current.setFieldValue("name", selectedCompanyName);
    formikRef.current.setFieldValue("productKey", "");
    dispatch(getProductDetailsByCompany({ cName: selectedCompanyName }));
  };
  
  const handleProductChange = (e) => {
    const selectedProductName = e.target.value || ""; // Ensure no undefined value
    const selectedProduct = productDetailsByCompany.find(
      (product) => product.pname === selectedProductName
    );
    if (selectedProduct) {
      formikRef.current.setFieldValue("product", selectedProduct.pname);
      formikRef.current.setFieldValue("productKey", selectedProduct._id);
      setSelectedProductName(selectedProduct.pname);
    }
  };

  return (
    <div>
      { (
        <div className="col-md-12 signup-form">
          <div className="card card-container">
            <h3>View Product Sales Graph</h3>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleGetGraph}
              innerRef={formikRef}
            >
              {({ resetForm }) => (
                <Form>
                  <div className="form-group">
                    <label htmlFor="name">Select Company Name</label>
                    <Field name="name">
                      {({ field, form }) => (
                        <div>
                          <input
                            type="text"
                            {...field}
                            list="companyOptions"
                            className="form-control"
                            placeholder="Search..."
                            onChange={(e) => {
                              form.setFieldValue("name", e.target.value);
                              handleCompanyChange(e);
                            }}
                          />
                          <datalist id="companyOptions">
                            {companyNames &&
                              companyNames.map((companyName) => (
                                <option
                                  key={companyName.name}
                                  value={companyName.name}
                                />
                              ))}
                          </datalist>
                        </div>
                      )}
                    </Field>
                    <ErrorMessage name="name" component="div" className="alert alert-danger" />

                    <label htmlFor="product">Select Product Name</label>
                    <Field name="product">
                      {({ field }) => (
                        <div>
                          <input
                            type="text"
                            {...field}
                            list="productOptions"
                            className="form-control"
                            placeholder="Search..."
                            onChange={handleProductChange}
                          />
                          <datalist id="productOptions">
                            {productDetailsByCompany &&
                              productDetailsByCompany.map((productDetails) => (
                                <option key={productDetails._id} value={productDetails.pname} />
                              ))}
                          </datalist>
                        </div>
                      )}
                    </Field>
                    <ErrorMessage name="product" component="div" className="alert alert-danger" />

                    <label htmlFor="noOfMonths">No of Months</label>
                    <Field name="noOfMonths" type="text" className="form-control" />
                    <ErrorMessage name="noOfMonths" component="div" className="alert alert-danger" />

                    <button type="submit" className="btn btn-primary btn-block" style={{ marginRight: "10px" }}>
                      Get Details
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
      {productSaleQtyMonthly && productSaleQtyMonthly.length > 0 ? (
      <div>
         {selectedProductName && (
          <h4>Selected Product: {selectedProductName}</h4>
        )}
        <ProductMonthlySalesAmountAndQtyGraph />
      </div>
    ) : (
      <div>{isgetProductSaleQtyMonthlySucess ? <center>No sales for {selectedProductName} in {selectedMonths} {selectedMonths < 2?"Month":"Month's"}</center>:""}</div>
    )}
    </div>
  );
};

export default ProductMonthlySalesGraph;
