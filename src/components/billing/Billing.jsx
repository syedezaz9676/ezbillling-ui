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
  const { billDetails } = useSelector((state) => state.ezInvoiceDetails);
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
  const Loader = () => (
    <div class="divLoader">
      <svg class="svgLoader" viewBox="0 0 100 100" width="10em" height="10em">
        <path
          stroke="none"
          d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50"
          fill="#51CACC"
          transform="rotate(179.719 50 51)"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            calcMode="linear"
            values="0 50 51;360 50 51"
            keyTimes="0;1"
            dur="1s"
            begin="0s"
            repeatCount="indefinite"
          ></animateTransform>
        </path>
      </svg>
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
    isEdit && billDetails ? billDetails.itemList : [""]
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
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Customer Name is required.")
    .test('is-valid-invoice', 'Select valid customer name', function (value) {
      return getname(customerNames).includes(value);
  }),
    itemList: Yup.array().of(
      Yup.object().shape({
        pname: Yup.string().required("Product Name is required.")
        .test('is-valid-product', 'Select valid product name', function (value) {
          return getProductNamesfromList(productDetails).includes(value);
      }),
        rate: Yup.number()
          .typeError("Rate must be a number.")
          .positive("Rate must be a positive number.")
          .required("Rate is required."),
        noofunites: Yup.number()
          .typeError("No of Unites must be a number.")
          .integer("No of Unites must be an integer.")
          .min(1, "No of Unites must be at least 1.")
          .required("No of Unites is required."),
        disc: Yup.number()
          .typeError("Discount must be a number.")
          .integer("Discount must be an integer."),
      })
    ),
  });

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
        product_name: isEdit?getPidByName(productDetails,item.pname):product.id,
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

  const options = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "orange", label: "Orange" },
  ];

  return (
    <div className="form-length">
      {loading ? <Loader /> : null}
      <div className="card card-container">
        <h3>{isEdit ? "Edit Invoice Details" : "Generate Invoice"}</h3>
        <Formik
          initialValues={isEdit ? editInitialValues : initialValues}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
          innerRef={formikRef}
        >
          {({ handleSubmit, setFieldValue, values,isSubmitting }) => (
            <Form>
              <div>
                <div className="form-row">
                  <div>
                    <label htmlFor="name">Customer Name</label>
                    <Field name="name">
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
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>
                  <div>
                    <label htmlFor="date">Date:</label>
                    <Field name="date" className="form-control">
                      {({ field, form }) => (
                        <DatePicker
                          id="selectedDate"
                          {...field}
                          selected={field.value}
                          dateFormat="yyyy-MM-dd"
                          onChange={(date) =>
                            form.setFieldValue(field.name, date)
                          }
                        />
                      )}
                    </Field>
                    <ErrorMessage name="date" component="div" />
                  </div>
                </div>
                <br />
                <button
                  variant="primary"
                  type="button"
                  onClick={() => handleAddPlayers()}
                  className="btn btn-primary btn-block"
                >
                  Add
                </button>
                <FieldArray
                  name="itemList"
                  render={(arrayHelpers) => (
                    <>
                      {itemList &&
                        itemList.map((_, index) => (
                          <div key={index} className="form-row">
                            <div className="form-group">
                              {index === 0 ? (
                                <label htmlFor={`itemList.${index}.noofunites`}>
                                  Unites
                                </label>
                              ) : (
                                ""
                              )}
                              <Field
                                name={`itemList.${index}.noofunites`}
                                type="number"
                                className="form-control"
                              />
                              <ErrorMessage
                                name={`itemList.${index}.noofunites`}
                                component="div"
                                className="text-danger"
                              />
                            </div>
                            <div className="form-group">
                              {index === 0 ? (
                                <label htmlFor={`itemList.${index}.pname`}>
                                  Product Name
                                </label>
                              ) : (
                                ""
                              )}
                              <Field name={`itemList.${index}.pname`}>
                                {({ field, form }) => (
                                  <div>
                                    <input
                                      type="text"
                                      className="form-control"
                                      {...field}
                                      list="selectOptions1"
                                      placeholder="Search..."
                                    />
                                    <datalist id="selectOptions1">
                                      {productDetails &&
                                        productDetails.map(
                                          (productDetail, index) => (
                                            <option
                                              key={index}
                                              value={productDetail.pname}
                                            >
                                            </option>
                                          )
                                        )}
                                    </datalist>
                                  </div>
                                )}
                              </Field>
                              <ErrorMessage
                                name={`itemList.${index}.pname`}
                                component="div"
                                className="text-danger"
                              />
                            </div>
                            <div className="form-group">
                              {index === 0 ? (
                                <label htmlFor={`itemList.${index}.rate`}>
                                  Rate
                                </label>
                              ) : (
                                ""
                              )}
                              <Field
                                name={`itemList.${index}.rate`}
                                type="number"
                                className="form-control"
                              />
                              <ErrorMessage
                                name={`itemList.${index}.rate`}
                                component="div"
                                className="text-danger"
                              />
                            </div>
                            <div className="form-group">
                              {/* <div></div> */}
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
                <button type="submit" className="btn btn-primary btn-block" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Save Details'}
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
  );
};

export default Billing;
