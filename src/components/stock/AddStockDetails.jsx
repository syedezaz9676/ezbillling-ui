import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { getProductDetails } from "../redux/slices/productdetails/ezProductDetailsSlice";
import { getCompanyDetails } from "../redux/slices/companydetails/ezCompanyDetailsSlice";
import { clearMessage } from "../redux/message";
import { useNavigate } from "react-router-dom";
import { ezshowField, ezhideField } from "../redux/slices/ezEnableFiledSlice";
import { saveProductDetails } from "../redux/slices/productdetails/ezProductDetailsSlice";
import { hideEdit } from "../redux/slices/ezEnableFiledSlice";
import { getStockDetailsById, saveStockDetails } from "../redux/slices/billingDetails/ezBillingDetailsSlice";

const AddStockDetails = () => {
  const navigate = useNavigate();
  const [successful, setSuccessful] = useState(false);

  const { message } = useSelector((state) => state.message);
  const { productDetails } = useSelector((state) => state.ezProductDetails);
  const { UserDetails } = useSelector((state) => state.ezLogin);
//   const { isenable } = useSelector((state) => state.ezEnableField);
//   const { companyDeatils } = useSelector((state) => state.ezCompanyDetails);
//   const { productDetailsByID } = useSelector((state) => state.ezProductDetails);
  const { StockDetailsById } = useSelector((state) => state.ezInvoiceDetails);
  const {isEdit } = useSelector((state) => state.ezEnableField);
//   const [gstpercentages, setGstpercentages] = useState([]);
  const formikRef = useRef();


const userID= UserDetails.user.id;


  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(getProductDetails({userID}))
    //   .unwrap()
    //   .then(() => {
    //   })
    //   .catch(() => {
    //   });

    // dispatch(getCompanyDetails({userID}))
    //   .unwrap()
    //   .then(() => {
    //   })
    //   .catch(() => {
    //   });

    dispatch(clearMessage());
  }, [dispatch]);


  const isNameUnique = (value) => {
    let names = [];
    productDetails.map((productDetail, index) => (
        names[index] = productDetail.pname
    ))
    console.log("names", names)
    return isEdit? true:!names.includes(value);
};
  

  const validationSchema = Yup.object().shape({
    newStock: Yup.number().min(0, "Number of Units must be a positive number").required("Number of Units is required!")
  });

  const InitialValues = {
    id:StockDetailsById.id,
    pname: StockDetailsById.pname,
    in_stock_units:StockDetailsById.in_stock_units,
    // last_updated_date:StockDetailsById.last_updated_date,
    last_updated_date: new Date()
  };

  const handleRegister = (formvalues) => {
    console.log('formvalues in hr', formvalues)

    const StockDetails ={
        _id:StockDetailsById._id,
        pname: formvalues.pname,
        in_stock_units:formvalues.in_stock_units,
        last_updated_date:formvalues.last_updated_date,
        newStock:formvalues.newStock
    }

    // setSuccessful(false);
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

    dispatch(saveStockDetails({StockDetails}))
          .unwrap()
          .then(() => {

            console.log('on sucess');
            navigate("/dashboard");
           
            // window.location.reload();
          })
          .catch(() => {
            console.log('on failed');
          });
          // navigate("/dashboard");

          dispatch(hideEdit());
          navigate("/dashboard");
  };

  return (
    <div className="col-md-12 signup-form">
      <div className="card card-container">
        <h3>ADD New Stock</h3>
        <Formik
          initialValues={InitialValues}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
          innerRef={formikRef}

        >
          {({ values }) => (
            <Form>
              {!successful && (
                <div>
                  <div className="form-group">
                    <label htmlFor="pname">Product Name</label>
                    <Field name="pname" type="text" className="form-control" />
                    <ErrorMessage
                      name="pname"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="in_stock_units">Avaliable Unites</label>
                    <Field name="in_stock_units" type="number" className="form-control" disabled />
                    <ErrorMessage
                      name="in_stock_units"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="newStock">Add New Stock in units</label>
                    <Field name="newStock" type="number" className="form-control" />
                    <ErrorMessage
                      name="newStock"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>
                  <div>
                    <label htmlFor="last_updated_date">Date:</label>
                    <Field name="last_updated_date" className="form-control">
                      {({ field, form }) => (
                        <DatePicker
                          id="last_updated_date"
                          {...field}
                          selected={field.value}
                          dateFormat="yyyy-MM-dd"
                          onChange={(date) =>
                            form.setFieldValue(field.name, date)
                          }
                        />
                      )}
                    </Field>
                    <ErrorMessage name="last_updated_date" component="div" />
                  </div>
                  <button type="submit" className="btn btn-primary btn-block">
                                    Edit Details
                                </button>
                </div>
              )}
            </Form>
          )}
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
    </div>
  );
};

export default AddStockDetails;
