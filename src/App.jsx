import React, { useState, useEffect  } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./components/login/Login";
import UserRoutes from "./components/userRoutes/userRoutes";
import {
  Routes, // instead of "Switch"
  Route,
} from "react-router-dom";
import Navbar from "./components/navbar/EzNavbar";
import './App.css';
import About from './components/about/About';
import {useSelector } from 'react-redux';
import CustomerRegistration from "./components/Registration/CustomerRegistration"
import Reg from './components/Registration/Reg';
import Company from './components/Company';
import axios from 'axios';
import { getCurrentUser } from './components/auth';
import LogoutButton from './components/logout\'/logout';
import CompanyRegistration from './components/Registration/CompanyRegistration';

const App = (props) => {
  const { isLoggedIn, UserDetails } = useSelector((state) => state.ezLogin);
  console.log('getCurrentUser', UserDetails);

  useEffect(() => {
  if (isLoggedIn) {
    axios.interceptors.request.use(
      config => {
        config.headers.Authorization = 'Bearer ' + UserDetails.token;
        config.headers.ContentType = 'application/json';
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );
  }
}, [UserDetails]);


  return (

    <div>
      <Navbar />
      <div className='routes'>
        <Routes >       
          <Route path="/login" element={<Login {...props} />} />
          <Route path="/logout" element={<LogoutButton />} />
          <Route path="/reg" element={<Reg />} />
          <Route path="/about" element={<About />} />
          <Route path="/com" element={<Company />} />
          <Route path="/customerreg" element={<CustomerRegistration />} />
          <Route path="/companyregistration" element={<CompanyRegistration />} />
          <Route path="/user" element={<UserRoutes />}>
            {/* <Route path="dashboard" element={<Dashboard />} /> */}

          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
