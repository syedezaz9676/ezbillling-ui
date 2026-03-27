import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Formik,
  Field,
  Form,
  ErrorMessage,
  FieldArray,
  useFormikContext,
  useFormik,
} from "formik";
import { Navigate, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { getProductDetails } from "../redux/slices/productdetails/ezProductDetailsSlice";
import { getCustomerNames } from "../redux/ezCustomerRegistrationSlice";
import { doCustomerRegistration } from "../redux/ezCustomerRegistrationSlice";
import { clearMessage } from "../redux/message";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { hideEdit } from "../redux/slices/ezEnableFiledSlice";
import "./Billing.css";
import moment from "moment";
import {
  saveBillingDetails,
  getInvoiceDetails,
  updateBillingDetails,
} from "../redux/slices/billingDetails/ezBillingDetailsSlice";

const Billing = () => {
  let navigate = useNavigate();
  const formik = useFormikContext();
  const [successful, setSuccessful] = useState(false);
  const { UserDetails } = useSelector((state) => state.ezLogin);
  const { message } = useSelector((state) => state.message);
  const { productDetails } = useSelector((state) => state.ezProductDetails);
  const [myArray, setMyArray] = useState([""]);
  const { companyDeatils, companyDetailsByID } = useSelector(
    (state) => state.ezCompanyDetails
  );
  const { customerNames } = useSelector(
    (state) => state.ezCustomerRegistration
  );
  const { isEdit } = useSelector((state) => state.ezEnableField);
  const comgstp = companyDetailsByID ? companyDetailsByID.gstPercentage : [];
  const formikRef = useRef();
  const [billingDetails, setBillingDetails] = useState([]);
  const { InvoiceNo, InvoiceItems } = useSelector(
    (state) => state.ezInvoiceDetails
  );
  const [loading, setLoading] = useState(false);
  const { billDetails,isOrderBill } = useSelector((state) => state.ezInvoiceDetails);
  const DatePickerField = ({ field, form, ...props }) => {
    const { setFieldValue } = form;
    const { name, value } = field;

    return (
      <DatePicker
        {...props}
        selected={value}
        onChange={(date) => setFieldValue(name, date)}
      />
    );
  };
  function getIdByName(customerNames, name) {
    const customer = customerNames.find((customer) => customer.cname === name);
    return customer ? customer.id : null;
  }
  function getNameById(customerNames, id) {
    const customer = customerNames.find((customer) => customer.id === id);
    return customer ? customer.cname : null;
  }
  function getPidByName(productDetails, name) {
    const product = productDetails.find((productDetail) => productDetail.pname === name);
    return product ? product.id : null;
  }

  function getPNameById(productDetails, id) {
    const product = productDetails.find((productDetail) => productDetail.id === id);
    return product ? product.pname : null;
  }
  const Loader = () => (
    <div className="loading-overlay">
      <div className="loading-spinner"></div>
    </div>
  );
  const editGstPerList = [];
  if (companyDetailsByID) {
    for (let i = 0; i < comgstp.length; i++) {
      const newObj = " ";
      editGstPerList.push(newObj);
    }
  }
  const [itemList, setItemList] = useState(
    isEdit||isOrderBill && billDetails ? billDetails.itemList : [""]
  );
  const dispatch = useDispatch();

  const formattedDate = null;
  const handleDateChange = (date) => {
    return formattedDate;
  };

  const userID = UserDetails.user.id;

  useEffect(() => {
    dispatch(getCustomerNames({ userID }))
      .unwrap()
      .then(() => {})
      .catch(() => {});

    dispatch(getProductDetails({ userID }))
      .unwrap()
      .then(() => {})
      .catch(() => {});
  }, [dispatch]);
  
  const orderbillItems ={
    name:
      isOrderBill && billDetails ? getNameById(customerNames, billDetails.name) : "",
    date: isOrderBill && billDetails ? new Date(billDetails.date) : "",
    itemList: isOrderBill && billDetails ? billDetails.itemList : [""],
  }
  const editInitialValues = {
    name:
      isEdit && billDetails ? getNameById(customerNames, billDetails.name) : "",
    date: isEdit && billDetails ? new Date(billDetails.date) : "",
    itemList: isEdit && billDetails ? billDetails.itemList : [""],
  };

  const initialValues = {
    name: "",
    date: new Date(),
  };

  const getname = (customerNames) => {
    return customerNames.map(bill => bill.cname);
  };
  
  const getProductNamesfromList = (productDetails) => {
    return productDetails.map((productDetail) => productDetail.pname);
  };
  const validateForm = (values) => {
    const errors = {};

    // Customer name validation
    if (!values.name) {
      errors.name = "Customer Name is required.";
    } else if (!getname(customerNames).includes(values.name)) {
      errors.name = "Select valid customer name";
    }

    // Item list validation
    if (values.itemList && values.itemList.length > 0) {
      const itemErrors = [];
      const productNames = [];

      values.itemList.forEach((item, index) => {
        const itemError = {};

        // Product name validation
        if (!item.pname) {
          itemError.pname = "Product Name is required.";
        } else if (!getProductNamesfromList(productDetails).includes(item.pname)) {
          itemError.pname = "Select valid product name";
        } else if (productNames.includes(item.pname)) {
          itemError.pname = "This product is already added to the invoice";
        } else {
          productNames.push(item.pname);
        }

        // Rate validation
        if (!item.rate) {
          itemError.rate = "Rate is required.";
        } else if (isNaN(item.rate) || item.rate <= 0) {
          itemError.rate = "Rate must be a positive number.";
        }

        // Quantity validation
        if (!item.noofunites) {
          itemError.noofunites = "Quantity is required.";
        } else if (isNaN(item.noofunites) || item.noofunites < 1 || !Number.isInteger(Number(item.noofunites))) {
          itemError.noofunites = "Quantity must be an integer and at least 1.";
        }

        // Discount validation (optional)
        if (item.disc !== undefined && item.disc !== null && item.disc !== "") {
          if (isNaN(item.disc) || item.disc < 0 || !Number.isInteger(Number(item.disc))) {
            itemError.disc = "Discount must be a non-negative integer.";
          }
        }

        if (Object.keys(itemError).length > 0) {
          itemErrors[index] = itemError;
        }
      });

      if (itemErrors.length > 0) {
        errors.itemList = itemErrors;
      }
    }

    return errors;
  };

  const handleRegister = async (formValue) => {
    formValue.userID = userID;
    const items = formValue.itemList;
    
    const updatedBillingDetails = [];
    console.log("item", items);
    for (const item of items) {
      console.log("item", item);
      const product = productDetails.find(
        (product) => isEdit?product.pname === item.pname:product.pname === item.pname
      );
      const billitem = {
        bno: isEdit ? billDetails.bno : "",
        cno: getIdByName(customerNames, formValue.name),
        product_name: isEdit|| isOrderBill ?getPidByName(productDetails,item.pname):product.id,
        product_gst: product.vatp,
        qty: item.noofunites,
        amount: item.rate,
        billing_date: formValue.date,
        free: item.freeunites,
        hsn_code: product.hsn_code,
        unites_per: product.unites_per,
        mrp: product.mrp,
        product_company: product.pcom,
        dgst: formValue.userID,
        disc: item.disc == null ? 0 : item.disc,
      };

      updatedBillingDetails.push(billitem);
    }
    if (isEdit) {
      await dispatch(
        updateBillingDetails({ BillingDetails: updatedBillingDetails })
      )
        .unwrap()
        .then(() => {})
        .catch(() => {});
      navigate("/invoice");
    } else {
      await dispatch(
        saveBillingDetails({ BillingDetails: updatedBillingDetails })
      )
        .unwrap()
        .then(() => {})
        .catch(() => {});
      navigate("/invoice");
    }
  };

  const handleAddPlayers = () => {
    setItemList([...itemList, ""]);
  };

  const handleRemovePlayers = (index) => {
    const updatedGstPerList = [...itemList];
    updatedGstPerList.splice(index, 1);
    setItemList(updatedGstPerList);
  };

  // Function to filter customer names based on input
  const filterCustomerNames = (inputValue) => {
    return customerNames.filter((customerName) =>
      customerName.cname.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  // Function to filter product names based on input
  const filterProductNames = (inputValue) => {
    return productDetails.filter((productDetail) =>
      productDetail.pname.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  return (
    <div className="billing-container">
      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}

      <div className="billing-header">
        <h1 className="billing-title">
          {isEdit ? "Edit Invoice" : "Generate New Invoice"}
        </h1>
        <p className="billing-subtitle">
          {isEdit ? "Modify existing invoice details" : "Create a new invoice for your customer"}
        </p>
      </div>

      <Formik
        initialValues={isEdit ? editInitialValues : isOrderBill ? orderbillItems : initialValues}
        validate={validateForm}
        onSubmit={handleRegister}
        innerRef={formikRef}
        validateOnChange={true}
        validateOnBlur={true}
      >
        {({ handleSubmit, setFieldValue, values, isSubmitting, validateForm }) => (
          <Form>
            {/* Invoice Details Section */}
            <div className="form-section">
              <h2 className="section-title">Invoice Details</h2>
              <div className="form-grid">
                <div className="form-field">
                  <label className="field-label" htmlFor="name">Customer Name</label>
                  <Field name="name">
                    {({ field, form }) => (
                      <div>
                        <input
                          type="text"
                          {...field}
                          list="customerOptions"
                          className="field-input"
                          placeholder="Search customer..."
                        />
                        <datalist id="customerOptions">
                          {customerNames &&
                            customerNames.map((customerName, index) => (
                              <option
                                key={customerName.id}
                                value={customerName.cname}
                              />
                            ))}
                        </datalist>
                      </div>
                    )}
                  </Field>
                  <ErrorMessage
                    name="name"
                    component="span"
                    className="error-message"
                  />
                </div>

                <div className="form-field">
                  <label className="field-label" htmlFor="date">Invoice Date</label>
                  <Field name="date">
                    {({ field, form }) => (
                      <DatePicker
                        id="selectedDate"
                        {...field}
                        selected={field.value}
                        dateFormat="yyyy-MM-dd"
                        className="field-input"
                        popperPlacement="top"
                        onChange={(date) =>
                          form.setFieldValue(field.name, date)
                        }
                      />
                    )}
                  </Field>
                  <ErrorMessage name="date" component="span" className="error-message" />
                </div>
              </div>
            </div>

            {/* Products Section */}
            <div className="form-section">
              <div className="items-header">
                <h2 className="section-title">Products & Services</h2>
                <button
                  type="button"
                  onClick={handleAddPlayers}
                  className="add-item-btn"
                >
                  <span>+</span>
                  Add Product
                </button>
              </div>

              <FieldArray
                name="itemList"
                render={(arrayHelpers) => (
                  <>
                    {itemList &&
                      itemList.map((_, index) => (
                        <div key={index} className="item-row">
                          <div className="item-field">
                            {index === 0 && <label className="item-label">Quantity</label>}
                            <Field
                              name={`itemList.${index}.noofunites`}
                              type="number"
                              className="field-input"
                              placeholder="Qty"
                            />
                            <ErrorMessage
                              name={`itemList.${index}.noofunites`}
                              component="span"
                              className="error-message"
                            />
                          </div>

                          <div className="item-field">
                            {index === 0 && <label className="item-label">Product Name</label>}
                            <Field name={`itemList.${index}.pname`}>
                              {({ field, form }) => {
                                // Get list of already selected products (excluding current item)
                                const selectedProducts = values.itemList
                                  ?.map((item, idx) => idx !== index ? item?.pname : null)
                                  .filter(Boolean) || [];

                                // Filter out already selected products
                                const availableProducts = productDetails.filter(
                                  product => !selectedProducts.includes(product.pname)
                                );

                                return (
                                  <div>
                                    <input
                                      type="text"
                                      className="field-input"
                                      {...field}
                                      list={`productOptions-${index}`}
                                      placeholder="Search product..."
                                    />
                                    <datalist id={`productOptions-${index}`}>
                                      {availableProducts.map(
                                        (productDetail, idx) => (
                                          <option
                                            key={idx}
                                            value={productDetail.pname}
                                          />
                                        )
                                      )}
                                    </datalist>
                                  </div>
                                );
                              }}
                            </Field>
                            <ErrorMessage
                              name={`itemList.${index}.pname`}
                              component="span"
                              className="error-message"
                            />
                          </div>

                          <div className="item-field">
                            {index === 0 && <label className="item-label">Rate (₹)</label>}
                            <Field
                              name={`itemList.${index}.rate`}
                              type="number"
                              className="field-input"
                              placeholder="0.00"
                              step="0.01"
                            />
                            <ErrorMessage
                              name={`itemList.${index}.rate`}
                              component="span"
                              className="error-message"
                            />
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              handleRemovePlayers(index);
                              arrayHelpers.remove(index);
                            }}
                            className="remove-item-btn"
                            title="Remove item"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                  </>
                )}
              />
            </div>

            {/* Form Actions */}
            <div className="form-actions">
              <button
                type="submit"
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : (isEdit ? 'Update Invoice' : 'Generate Invoice')}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Billing;
