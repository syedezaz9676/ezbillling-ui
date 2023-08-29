import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./components/login/Login";
import UserRoutes from "./components/userRoutes/userRoutes";
import Dashboard from "./components/dashboard/dashboard";
// import {BrowserRouter,
//   Routes, // instead of "Switch"
//   Route,
// } from "react-router-dom";
import Navbar from "./components/navbar/EzNavbar";
import  Company from "./components/Company";
import'./App.css';
import About from './components/about/About';
import { bindActionCreators } from '@reduxjs/toolkit';
import { actions } from './components/redux/AuthActions';
const App=(props)=> {

  return (
    <div>app</div>
  //   <BrowserRouter>
  //   <Navbar/>
  //   <div className='routes'>
  //   <Routes >
  //     <Route path="/login" element={<Login {...props} />}/>
  //     <Route path="/about" element={<About />}/>
  //     <Route path ="/user" element={<UserRoutes/>}>
  //       <Route path ="dashboard" element={<Dashboard/>}/>
  //     </Route>
  //   </Routes>
  //   </div>
  // </BrowserRouter> 
  );
}



export default App;
