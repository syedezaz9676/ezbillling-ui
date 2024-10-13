import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { clearMessage } from "../redux/message";
import { showEdit } from "../redux/slices/ezEnableFiledSlice";
import { getCompanyNames } from "../redux/slices/companydetails/ezCompanyDetailsSlice";
import {
  getProductDetailsByID,
  getProductDetailsByCompany,
  deActivateProduct,
} from "../redux/slices/productdetails/ezProductDetailsSlice";
import ProductRegistration from "./ProductRegistration ";

const EditProductDetails = () => {
  const formikRef = useRef();
  const { UserDetails } = useSelector((state) => state.ezLogin);
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.message);
  const [successful, setSuccessful] = useState(false);
  const { isEdit } = useSelector((state) => state.ezEnableField);
  const { companyNames } = useSelector((state) => state.ezCompanyDetails);
  const { productDetailsByCompany, isgetProductDetailsByIDPending } =
    useSelector((state) => state.ezProductDetails);

  const userID = UserDetails.user.id;

  useEffect(() => {
    dispatch(getCompanyNames({ userID }))
      .unwrap()
      .catch(() => {});
  }, [dispatch, userID]);

  const initialValues = {
    name: "",
    product: "",
    productKey: "", // Added hidden field for the product key (ID)
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
  });

  const handleEditProduct = (formValue) => {
    const { productKey } = formValue; // Get the product ID (key)
    dispatch(getProductDetailsByID({ id: productKey })); // Use the product key
    dispatch(showEdit());
  };

  const handleCompanyChange = (e) => {
    const selectedCompanyName = e.target.value;
    formikRef.current.setFieldValue("product", ""); 
    formikRef.current.setFieldValue("name", selectedCompanyName);
    formikRef.current.setFieldValue("productKey", ""); // Clear hidden field when changing company
    dispatch(getProductDetailsByCompany({ cName: selectedCompanyName }));
  };

  const handleProductChange = (e) => {
    const selectedProductName = e.target.value;
    const selectedProduct = productDetailsByCompany.find(
      (product) => product.pname === selectedProductName
    );
    if (selectedProduct) {
      formikRef.current.setFieldValue("product", selectedProduct.pname); // Set product name
      formikRef.current.setFieldValue("productKey", selectedProduct._id); // Set the hidden product key
    }
  };

  const handleDeactivate = (productKey, resetForm) => {
    if (window.confirm("Are you sure you want to deactivate this product?")) {
      dispatch(deActivateProduct({ id: productKey })) // Use the productKey for deactivation
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
            <h3>Edit Product Details</h3>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleEditProduct}
              innerRef={formikRef}
            >
              {({ resetForm, values }) => (
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
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="alert alert-danger"
                    />

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
                            onChange={(e) => handleProductChange(e)}
                            onInput={(e) => handleProductChange(e)} // Capture input event too
                          />
                          <datalist id="productOptions">
                            {productDetailsByCompany &&
                              productDetailsByCompany.map((productDetails) => (
                                <option
                                  key={productDetails._id}
                                  value={productDetails.pname}
                                />
                              ))}
                          </datalist>
                        </div>
                      )}
                    </Field>
                    <ErrorMessage
                      name="product"
                      component="div"
                      className="alert alert-danger"
                    />

                    {/* Hidden field to store the product key (ID) */}
                    <Field type="hidden" name="productKey" />

                    <button
                      type="submit"
                      className="btn btn-primary btn-block"
                      style={{ marginRight: "10px" }}
                    >
                      Edit Details
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger btn-block"
                      onClick={() =>
                        handleDeactivate(values.productKey, resetForm)
                      }
                    >
                      Deactivate Product
                    </button>
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
      )}
      {isEdit && !isgetProductDetailsByIDPending && <ProductRegistration />}
    </div>
  );
};

export default EditProductDetails;
