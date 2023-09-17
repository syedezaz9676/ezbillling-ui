import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import { Navigate, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { doCustomerRegistration } from "../redux/ezCustomerRegistrationSlice";
import { clearMessage } from "../redux/message";
import { getCompanyDetails,saveCompanyDetails } from "../redux/slices/companydetails/ezCompanyDetailsSlice"; 

// ... (previous imports)

const CompanyRegistration = () => {
    let navigate = useNavigate();
    const [successful, setSuccessful] = useState(false);

    const { message } = useSelector((state) => state.message);
    const { companyDeatils } = useSelector((state) => state.ezCompanyDetails);
    const [gstPerList, setGstPerList] = useState([""]); // Initialize with an empty string
    const dispatch = useDispatch();

    const isNameUnique = (value) => {
        console.log("in isnameunique",companyDeatils)
        let names=[];
        companyDeatils.map((companydetail,index)=>(
            console.log("companydetail.name",companydetail.name),
            names[index]=companydetail.name
        ))
        console.log("names",names)
        return !names.includes(value);
      };

    useEffect(() => {
        dispatch(getCompanyDetails())
          .unwrap()
          .then(() => {
            // navigate("/user/dashboard");
            // window.location.reload();
          })
          .catch(() => {
          });
    }, [dispatch]);

    //   const { GstCodeDetails } = useSelector((state) => state.ezgetGstCodeDetails);

    const initialValues = {
        name: "",
        gstPer: []
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string()
          .min(3, 'The name must be at least 3 characters.')
          .max(20, 'The name must be at most 20 characters.')
          .test('is-unique', 'Company name already exists.', isNameUnique)
          .required('Company Name is required.'),
        gstPer: Yup.array()
          .of(
            Yup.number()
              .typeError('GST Percentage must be a number.')
              .min(0, 'GST Percentage must be greater than or equal to 0.')
              .max(100, 'GST Percentage must be less than or equal to 100.')
          )
          .min(1, 'At least one GST Percentage is required.') // Require at least one item in the array
          .required('At least one GST Percentage is required.'), // Make sure at least one GST Percentage is entered
      });

    const handleRegister = (formValue) => {
        console.log('formValue', formValue);
        const companyrDetails={
            "name":formValue.name,
            "gstPercentage":formValue.gstPer
        } 
        console.log('companyrDetails in cr', companyrDetails);
        dispatch(saveCompanyDetails({companyrDetails}))
          .unwrap()
          .then(() => {
            navigate("/login");
            // window.location.reload();
          })
          .catch(() => {
          });
    };

    const handleAddPlayers = () => {
        setGstPerList([...gstPerList, ""]); // Add a new empty GST Percentage field
    };

    const handleRemovePlayers = (index) => {
        const updatedGstPerList = [...gstPerList];
        updatedGstPerList.splice(index, 1);
        setGstPerList(updatedGstPerList);
    };

    return (
        <div className="col-md-12 signup-form">
            <div className="card card-container">
                <h3>Company Registration</h3>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleRegister}
                >
                    <Form>
                        {/* ... (other form fields) */}
                        <div>
                            <div className="form-group">
                                <label htmlFor="name">Company Name</label>
                                <Field name="name" type="text" className="form-control" />
                                <ErrorMessage
                                    name="name"
                                    component="div"
                                    className="alert alert-danger"
                                />
                            </div>
                            <br></br>
                            <button
                                variant="primary"
                                type="button"
                                onClick={() => handleAddPlayers()}
                                className="btn btn-primary btn-block"
                            >
                                Add another Gst Percentage
                            </button>
                            <FieldArray
                                name="gstPer"
                                render={(arrayHelpers) => (
                                    <>
                                        {gstPerList.map((_, index) => (
                                            <div key={index}>
                                                <div className="form-group">
                                                    <label htmlFor={`gstPer[${index}]`}>GST Percentage</label>
                                                    <Field
                                                        name={`gstPer[${index}]`}
                                                        type="number"
                                                        className="form-control"
                                                    />
                                                    <ErrorMessage name={`gstPer[${index}]`} component="div" className="text-danger" />
                                                </div>
                                                <div className="form-group">
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

export default CompanyRegistration;
