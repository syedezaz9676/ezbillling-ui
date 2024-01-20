import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage, FieldArray, useFormikContext, useFormik } from "formik";
import { Navigate, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { getProductDetails } from "../redux/slices/productdetails/ezProductDetailsSlice";
import { getCustomerNames } from "../redux/ezCustomerRegistrationSlice";
import { doCustomerRegistration } from "../redux/ezCustomerRegistrationSlice";
import { clearMessage } from "../redux/message";
import DatePicker from 'react-datepicker';
// import DatePicker from "../helper/DatePicker";
import 'react-datepicker/dist/react-datepicker.css';
import { hideEdit } from "../redux/slices/ezEnableFiledSlice";
import './Billing.css'
import moment from 'moment';
import { saveBillingDetails } from "../redux/slices/billingDetails/ezBillingDetailsSlice";



const Billing = () => {

    let navigate = useNavigate();
    const formik = useFormikContext();
    const [successful, setSuccessful] = useState(false);
    const { UserDetails } = useSelector((state) => state.ezLogin);
    const { message } = useSelector((state) => state.message);
    const { productDetails } = useSelector((state) => state.ezProductDetails);
    const [myArray, setMyArray] = useState([""]);
    const { companyDeatils, companyDetailsByID } = useSelector((state) => state.ezCompanyDetails);
    const { customerNames } = useSelector((state) => state.ezCustomerRegistration);
    const { isEdit } = useSelector((state) => state.ezEnableField);
    const comgstp = companyDetailsByID ? companyDetailsByID.gstPercentage : []
    const formikRef = useRef();
    const [billingDetails, setBillingDetails] = useState([]);

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
    const editGstPerList = [];
    if (companyDetailsByID) {
        for (let i = 0; i < comgstp.length; i++) {
            const newObj = " ";
            editGstPerList.push(newObj);
        }

    }
    const [itemList, setItemList] = useState(isEdit && companyDetailsByID ? editGstPerList : [""]);
    // const [itemList, setItemList] = useState([""]);
    const dispatch = useDispatch();

    const formattedDate = null;
    const handleDateChange = (date) => {
        // Check if the date is valid before formatting
        // if (date instanceof Date && !isNaN(date)) {
        //   formattedDate = date.toISOString().slice(0, 10); // Format as yyyy-MM-dd
        //   console.log(formattedDate);
        // }

        return formattedDate;
    };
    // const isNameUnique = (value) => {
    //     console.log("in isnameunique", companyDeatils)
    //     let names = [];
    //     companyDeatils.map((companydetail, index) => (
    //         console.log("companydetail.name", companydetail.name),
    //         names[index] = companydetail.name
    //     ))
    //     console.log("names", names)
    //     return isEdit? true:!names.includes(value);
    // };

    const userID = UserDetails.user.id;

    useEffect(() => {

        dispatch(getCustomerNames({ userID }))
            .unwrap()
            .then(() => {
            })
            .catch(() => {
            })

        dispatch(getProductDetails({ userID }))
            .unwrap()
            .then(() => {
            })
            .catch(() => {
            })
    }, [dispatch]);

    const editInitialValues = {
        name: (isEdit && companyDetailsByID) ? companyDetailsByID.name : '',
        gstPer: (isEdit && companyDetailsByID) ? companyDetailsByID.gstPercentage : []
    };

    const initialValues = {
        name: '',
        date: new Date()
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Company Name is required.'),
        // date: Yup.date()
        //   .required('Date is required.'),
        itemList: Yup.array().of(
            Yup.object().shape({
                pname: Yup.string()
                    .required('Product Name is required.'),
                rate: Yup.number()
                    .typeError('Rate must be a number.')
                    .positive('Rate must be a positive number.')
                    .required('Rate is required.'),
                noofunites: Yup.number()
                    .typeError('No of Unites must be a number.')
                    .integer('No of Unites must be an integer.')
                    .min(1, 'No of Unites must be at least 1.')
                    .required('No of Unites is required.'),
            })
        ),
    });



    // const handleRegister = (formValue) => {
    //     // const product=null;
    //     // const billitem =null;
    //     // formValue.userID = userID;
    //     // const items=formValue.itemList;
    //     // console.log('itemsp',items);
    //     // // {items && items.map((item) => {
    //     // //     console.log('in side map');
    //     // // const product = productDetails.find(product => product.id === item.pname);
    //     // // const billitem ={
    //     // //  cno:formValue.name,
    //     // //  product_name:item.pname,
    //     // //  product_gst:product.vatp,
    //     // //  qty:item.noofunites,
    //     // //  amount:item.rate,
    //     // //  billing_date:formValue.date,
    //     // //  free:item.freeunites,
    //     // //  hsn_code:product.hsn_code,
    //     // //  unites_per:product.unites_per,
    //     // //  mrp:product.mrp,
    //     // //  product_company:product.pcom,
    //     // //  dgst:formValue.userID

    //     // // }

        
    //     // // const updatedItems = [...BillingDetails, billitem];
    //     // // setbillingDetails(BillingDetails =>BillingDetails.concat( billitem));
    //     // // addItemToArray(billitem);
    //     // // // const billitem.cno=formValue.user;
             
    //     //   console.log('BillingDetails',BillingDetails);
           
    //     // })}
    //     // // console.log('formValue', formValue);
    //     // // console.log('BillingDetails', BillingDetails);
       
    //     // dispatch(saveBillingDetails({ BillingDetails }))

        




    //     // const editedCompanyDetails={
    //     //     "id":isEdit ?companyDetailsByID.id:'',
    //     //     "name": formValue.name,
    //     //     "gstPercentage": formValue.gstPer,
    //     //     "dgst": UserDetails.user.id
    //     // }

    //     // const createcompanyrDetails = {
    //     //     "name": formValue.name,
    //     //     "gstPercentage": formValue.gstPer,
    //     //     "dgst": UserDetails.user.id
    //     // }

    //     // const companyrDetails =isEdit ? editedCompanyDetails :createcompanyrDetails

    //     // console.log('companyrDetails in cr', companyrDetails);
    //     // dispatch(saveCompanyDetails({ companyrDetails }))
    //     //     .unwrap()
    //     //     .then(() => {
    //     //         navigate("/dashboard");

    //     //         // window.location.reload();
    //     //     })
    //     //     .catch(() => {
    //     //     });

    //     //     dispatch(hideEdit())    
    //     formValue.userID = userID;
    //     const items = formValue.itemList;
    
    //     items.forEach((item) => {
    //       const product = productDetails.find(product => product.id === item.pname);
    //       const billitem = {
    //         cno: formValue.name,
    //         product_name: item.pname,
    //         product_gst: product.vatp,
    //         qty: item.noofunites,
    //         amount: item.rate,
    //         billing_date: formValue.date,
    //         free: item.freeunites,
    //         hsn_code: product.hsn_code,
    //         unites_per: product.unites_per,
    //         mrp: product.mrp,
    //         product_company: product.pcom,
    //         dgst: formValue.userID
    //       };
    
    //       // Update state using functional update to correctly capture the previous state
    //       setBillingDetails(prevBillingDetails => [...prevBillingDetails, billitem]);
    //     });
    
    //     dispatch(saveBillingDetails({ BillingDetails: billingDetails }));

    // };
    const handleRegister = async (formValue) => {
        formValue.userID = userID;
        const items = formValue.itemList;
        const updatedBillingDetails = [];
      
        for (const item of items) {
          const product = productDetails.find((product) => product.id === item.pname);
          const billitem = {
            cno: formValue.name,
            product_name: item.pname,
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
          };
      
          updatedBillingDetails.push(billitem);
        }
      
        // Dispatch the action with the updated billing details directly
        await dispatch(saveBillingDetails({ BillingDetails: updatedBillingDetails }));
      
        // Clear any messages or perform other actions as needed
        // ...
      
        // Clear the billing details state after successful dispatch if needed
        setBillingDetails([]);
      };
      

    const handleAddPlayers = () => {
        setItemList([...itemList, ""]); // Add a   new empty GST Percentage field
    };

    const handleRemovePlayers = (index) => {
        const updatedGstPerList = [...itemList];
        updatedGstPerList.splice(index, 1);
        setItemList(updatedGstPerList);
    };

    return (
        <div className="form-length">
            <div className="card card-container">
                <h3>{isEdit ? "Edit Company Details" : "Company Registration"}</h3>
                <Formik
                    initialValues={isEdit ? editInitialValues : initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleRegister}
                    innerRef={formikRef}
                >
                    {({ handleSubmit, setFieldValue, values }) => (
                        <Form>
                            {/* ... (other form fields) */}
                            <div>
                                <div className="form-row">
                                    <div  >
                                        <label htmlFor="name">Customer Name</label>
                                        <Field name="name" as="select" className="form-control" >
                                            {customerNames && customerNames.map((customerName, index) => (
                                                <option key={index} value={customerName.id}>
                                                    {customerName.cname}
                                                </option>
                                            ))}
                                        </Field>
                                        <ErrorMessage
                                            name="name"
                                            component="div"
                                            className="alert alert-danger"
                                        />
                                    </div>
                                    <div >
                                        <label htmlFor="date">Date:</label>
                                        <Field name="date" className="form-control">
                                            {({ field, form }) => (
                                                <DatePicker
                                                    id="selectedDate"
                                                    {...field}
                                                    selected={field.value}
                                                    onChange={(date) => form.setFieldValue(field.name, date)}
                                                />
                                            )}
                                        </Field>
                                        <ErrorMessage name="date" component="div" />
                                    </div>
                                </div>
                                <br></br>
                                <button
                                    variant="primary"
                                    type="button"
                                    onClick={
                                        () => handleAddPlayers()}
                                    className="btn btn-primary btn-block"
                                >
                                    Add
                                </button>
                                <FieldArray
                                    name="itemList"
                                    render={(arrayHelpers) => (
                                        <>
                                            {itemList && itemList.map((_, index) => (
                                                <div key={index} className="form-row">
                                                    <div className="form-group">
                                                        {index === 0 ? <label htmlFor={`itemList.${index}.noofunites`}>Unites</label> : ''}
                                                        <Field
                                                            name={`itemList.${index}.noofunites`}
                                                            type="number"
                                                            className="form-control"
                                                        />
                                                        <ErrorMessage name={`itemList.${index}.noofunites`} component="div" className="text-danger" />
                                                    </div>
                                                    <div className="form-group">
                                                        {index === 0 ? <label htmlFor={`itemList.${index}.pname`}>Product Name</label> : ''}
                                                        <Field
                                                            name={`itemList.${index}.pname`}
                                                            as="select"
                                                            className="form-control"
                                                        >
                                                            <option>--Please Select---</option>
                                                            {productDetails && productDetails.map((productDetail, index) => (
                                                                <option key={index} value={productDetail.id}>
                                                                    {productDetail.pname}
                                                                </option>
                                                            ))}
                                                        </Field>
                                                        <div className="form-group">
                                                            {index === 0 ? <label htmlFor={`itemList.${index}.hsn`}>Unites</label> : ''}

                                                            {/* <ErrorMessage name={`itemList.${index}.noofunites`} component="div" className="text-danger" /> */}
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        {index === 0 ? <label htmlFor={`itemList.${index}.rate`}>Rate</label> : ''}
                                                        <Field
                                                            name={`itemList.${index}.rate`}
                                                            type="number"
                                                            className="form-control"
                                                        />
                                                        <ErrorMessage name={`itemList.${index}.rate`} component="div" className="text-danger" />
                                                    </div>
                                                    <div className="form-group">
                                                        {index === 0 ? <label htmlFor={`itemList.${index}.freeunites`}>Free Unites</label> : ''}
                                                        <Field
                                                            name={`itemList.${index}.freeunites`}
                                                            type="number"
                                                            className="form-control"
                                                        />
                                                        <ErrorMessage name={`itemList.${index}.freeunites`} component="div" className="text-danger" />
                                                    </div>
                                                    <div className="form-group">
                                                        <div></div>
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
                                <button type="submit" className="btn btn-primary btn-block">
                                    Save Details
                                </button>
                            </div>
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

export default Billing;
