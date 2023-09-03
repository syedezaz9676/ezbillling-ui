import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./components/login/Login";
import UserRoutes from "./components/userRoutes/userRoutes";
import Dashboard from "./components/dashboard/dashboard";
import {
  BrowserRouter,
  Routes, // instead of "Switch"
  Route,
} from "react-router-dom";
import Navbar from "./components/navbar/EzNavbar";
import './App.css';
import About from './components/about/About';
import { useDispatch, useSelector } from 'react-redux';
import { doLogin } from './components/redux/loginSlice';
import { Navigate, useNavigate } from "react-router-dom";
const App = (props) => {

  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.ezLogin);

  return (

    <div>
      <Navbar />
      <div className='routes'>
        <Routes >
          <Route path="/login" element={<Login {...props} />} />
          <Route path="/about" element={<About />} />
          <Route path="/user" element={<UserRoutes />}>
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
      