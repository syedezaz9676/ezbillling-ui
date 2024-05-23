import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { isLoggedin } from '../auth';
import { ezlogout } from '../redux/ezLoginSlice';
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import './navbar-routes.css'





function EzNavbar() {
  let navigate = useNavigate();


  const { isLoggedIn } = useSelector((state) => state.ezLogin);
  const { UserDetails } = useSelector((state) => state.ezLogin);

  useEffect(() => {
   
      // window.location.href = '/login';
     
  
  }, [UserDetails === null]);
  const dispatch = useDispatch();

  const logout=()=>{
  
    // Clear the authentication token or relevant data from local storage
    // localStorage.removeItem('user'); // Replace 'authToken' with your actual key
  
    dispatch(ezlogout());
  
    // Redirect to the login page or perform any other logout actions
    // For example, you can use react-router-dom for redirection
    window.location.href = '/login'; // Redirect to the login page
  }
  return (
    <Navbar bg="dark" variant='dark'>
      <Container>
        {!UserDetails && <Navigate to="/login" />}
        {isLoggedIn ?<Navbar.Brand className="navbar-brand-clickable" onClick={()=>logout()}  >Logout</Navbar.Brand> :<Navbar.Brand href="/login">Login</Navbar.Brand>}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={()=>navigate("/dashboard")}>Dashboard</Nav.Link>
          </Nav>
          {UserDetails && (
            <Nav className="ms-auto">
              <Navbar.Text className="multi-color-text">{UserDetails.user.firmName}</Navbar.Text>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default EzNavbar; 