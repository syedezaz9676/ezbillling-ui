import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { doEzLogin } from "../redux/ezLoginSlice";
import { clearMessage } from "../redux/message";
import './Login.css';

const Login = () => {
  let navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.ezLogin);
  const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Please Enter Username"),
    password: Yup.string().required("Please Enter Password"),
  });

  const handleLogin = (formValue) => {
    const { username, password } = formValue;
    setLoading(true);

    dispatch(doEzLogin({ username, password }))
      .unwrap()
      .then((response) => {
        localStorage.setItem('user', JSON.stringify(response.UserDetails.data));
        dispatch(clearMessage());
        navigate("/dashboard");
      })
      .catch(() => {
        setLoading(false);
      });
  };

  // If already logged in, redirect to dashboard
  if (isLoggedIn) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="login-wrapper">
      <div className="login-background">
        <div className="bg-shape bg-shape-1"></div>
        <div className="bg-shape bg-shape-2"></div>
        <div className="bg-shape bg-shape-3"></div>
      </div>
      
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <div className="logo-container">
              <span className="logo-icon">⚡</span>
            </div>
            <h1 className="login-title">EzBilling</h1>
            <p className="login-subtitle">Sign in to your account</p>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            {({ isSubmitting }) => (
              <Form className="login-form">
                <div className="form-group-modern">
                  <label htmlFor="username">
                    <span className="label-icon">👤</span>
                    Username
                  </label>
                  <Field 
                    name="username" 
                    type="text" 
                    className="form-control-modern" 
                    placeholder="Enter your username"
                    autoComplete="username"
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="error-message"
                  />
                </div>

                <div className="form-group-modern">
                  <label htmlFor="password">
                    <span className="label-icon">🔒</span>
                    Password
                  </label>
                  <Field 
                    name="password" 
                    type="password" 
                    className="form-control-modern" 
                    placeholder="Enter your password"
                    autoComplete="current-password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error-message"
                  />
                </div>

                <div className="form-actions">
                  <button 
                    type="submit" 
                    className="btn-login" 
                    disabled={loading || isSubmitting}
                  >
                    {loading || isSubmitting ? (
                      <>
                        <span className="spinner"></span>
                        Signing in...
                      </>
                    ) : (
                      <>
                        <span className="btn-icon">→</span>
                        Sign In
                      </>
                    )}
                  </button>
                </div>
              </Form>
            )}
          </Formik>

          {message && (
            <div className="alert-message">
              <span className="alert-icon">⚠️</span>
              {message}
            </div>
          )}

          <div className="login-footer">
            <p className="footer-text">
              Secure billing solution for your business
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
