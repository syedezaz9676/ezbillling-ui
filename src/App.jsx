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
import CustomerRegistration from "./components/Registration/CustomerRegistration"
import Reg from './components/Registration/Reg';
import Company from './components/Company';
import axios from 'axios';
import { getCurrentUser } from './components/auth';
import LogoutButton from './components/logout\'/logout';
import CompanyRegistration from './components/Registration/CompanyRegistration';
import Dashboard from "./components/dashboard/dashboard";
import ProductRegistration from "./components/Registration/ProductRegistration ";
import EditCompanyDetails from "./components/Registration/EditCompanyDetails";
import { hideEdit } from "./components/redux/slices/ezEnableFiledSlice";
import { useDispatch, useSelector } from "react-redux";
import EditCustomerDetails from "./components/Registration/EditCustomerDetails";
import EditProductDetails from "./components/Registration/EditProductDetails";
import CustomerDetailTable from "./components/tables/CustomerDetailTable";
import CompanyDetailsTable from "./components/tables/CompanyDetailsTable";
import ProductDetailsTable from "./components/tables/ProductDetailsTable";
import Billing from "./components/billing/Billing";
import MyForm from "./components/billing/MyForm";


const App = (props) => {
  const { isLoggedIn, UserDetails } = useSelector((state) => state.ezLogin);
  const dispatch = useDispatch();
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

useEffect(()=>{
dispatch(hideEdit())
},[window.location.href])


  return (

    <div>
      <Navbar />
      <div className='routes'>
        <Routes >       
          <Route path="/login" element={<Login {...props} />} />
          <Route path="/logout" element={<LogoutButton />} />
          <Route path="/productregistration" element={<ProductRegistration />} />
          <Route path="/about" element={<About />} />
          <Route path="/com" element={<Company />} />
          <Route path="/customerreg" element={<CustomerRegistration />} />
          <Route path="/companyregistration" element={<CompanyRegistration />} />
          <Route path="/editcompanydetails" element={<EditCompanyDetails />} />
          <Route path="/editcustomerdetails" element={<EditCustomerDetails />} />
          <Route path="/editproductdetails" element={<EditProductDetails />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user" element={<UserRoutes />}/>
          <Route path="/customertable" element={<CustomerDetailTable />}/>
          <Route path="/companytable" element={<CompanyDetailsTable />}/>
          <Route path="/productstable" element={<ProductDetailsTable />}/>
          <Route path="/generatebill" element={<Billing />}/>
          <Route path="/myform" element={<MyForm />}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
