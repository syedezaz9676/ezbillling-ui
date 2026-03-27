import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { isLoggedin } from '../auth';
import { ezlogout } from '../redux/ezLoginSlice';
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import './navbar-routes.css';

function EzNavbar() {
  let navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.ezLogin);
  const { UserDetails } = useSelector((state) => state.ezLogin);

  const dispatch = useDispatch();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const logout = () => {
    dispatch(ezlogout());
    window.location.href = '/login';
  };

  return (
    <Navbar 
      expand="lg" 
      className={`ez-navbar ${scrolled ? 'scrolled' : ''}`}
      variant="dark"
    >
      <Container fluid className="px-4">
        <Navbar.Brand className="brand-logo" onClick={() => navigate("/dashboard")}>
          <span className="brand-icon">⚡</span>
          <span className="brand-text">EzBilling</span>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {isLoggedIn && (
              <>
                <Nav.Link 
                  onClick={() => navigate("/dashboard")} 
                  className="nav-link-modern"
                >
                  <span className="nav-icon">📊</span>
                  Dashboard
                </Nav.Link>
                <Nav.Link 
                  onClick={() => navigate("/generatebill")} 
                  className="nav-link-modern"
                >
                  <span className="nav-icon">🧾</span>
                  Generate Invoice
                </Nav.Link>
                <Nav.Link 
                  onClick={() => navigate("/invoices")} 
                  className="nav-link-modern"
                >
                  <span className="nav-icon">📁</span>
                  Invoices
                </Nav.Link>
                <Nav.Link 
                  onClick={() => navigate("/customertable")} 
                  className="nav-link-modern"
                >
                  <span className="nav-icon">👥</span>
                  Customers
                </Nav.Link>
              </>
            )}
          </Nav>
          
          {UserDetails && (
            <Nav className="ms-auto align-items-center">
              <div className="user-info">
                <span className="user-greeting">Welcome,</span>
                <span className="user-name">{UserDetails.user?.firmName || 'User'}</span>
              </div>
              
              <NavDropdown 
                title={
                  <span className="user-avatar">
                    {(UserDetails.user?.firmName || 'U').charAt(0).toUpperCase()}
                  </span>
                } 
                id="user-dropdown"
                align="end"
              >
                <NavDropdown.Item onClick={() => navigate("/companytable")}>
                  <span className="dropdown-icon">🏢</span> Company Details
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate("/productstable")}>
                  <span className="dropdown-icon">📦</span> Products
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logout} className="logout-item">
                  <span className="dropdown-icon">🚪</span> Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          )}
          
          {!isLoggedIn && (
            <Nav className="ms-auto">
              <Nav.Link 
                href="/login" 
                className="login-link"
              >
                <span className="login-icon">🔑</span>
                Login
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default EzNavbar;
