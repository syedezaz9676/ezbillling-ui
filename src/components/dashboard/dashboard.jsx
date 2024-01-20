import React, { useState, useEffect  } from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Navigate, useNavigate } from "react-router-dom";
import { hideEdit } from "../redux/slices/ezEnableFiledSlice";
import { useDispatch, useSelector } from "react-redux";

function Dashboard() {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(hideEdit())
    },[])

    let navigate = useNavigate();
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 col-lg-4">
          <Card>
            <Card.Body>
              <Card.Title>Customer Registration</Card.Title>
              <Card.Text>
              Click here to Register the Customer
              </Card.Text>
              <Button variant="primary"
                  onClick={()=>navigate("/customerreg")}
              >Click</Button>
              <Button variant="primary"
                  onClick={()=>navigate("/editcustomerdetails")}
              >Edit</Button>
               <Button variant="primary"
              onClick={()=>navigate("/customertable")}
              >View</Button>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-6 col-lg-4">
          <Card>
            <Card.Body>
              <Card.Title>Company Registration</Card.Title>
              <Card.Text>
              Click here to Register the Company
              </Card.Text>
              <Button variant="primary"
              onClick={()=>navigate("/companyregistration")}
              >Click</Button>
              <Button variant="primary"
              onClick={()=>navigate("/editcompanydetails")}
              >Edit</Button>
              <Button variant="primary"
              onClick={()=>navigate("/companytable")}
              >View</Button>
             
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-6 col-lg-4">
          <Card>
            <Card.Body>
              <Card.Title>Product Registration</Card.Title>
              <Card.Text>
              Click here to Register the Product
              </Card.Text>
             <Button variant="primary"
              onClick={()=>navigate("/productregistration")}
              >Click</Button> 
              <Button variant="primary"
              onClick={()=>navigate("/editproductdetails")}
              >Edit</Button>
               <Button variant="primary"
              onClick={()=>navigate("/productstable")}
              >View</Button>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-6 col-lg-4">
          <Card>
            <Card.Body>
              <Card.Title>Billing</Card.Title>
              <Card.Text>
              Click here for billing
              </Card.Text>
             <Button variant="primary"
              onClick={()=>navigate("/generatebill")}
              >Click</Button> 
              {/* <Button variant="primary"
              onClick={()=>navigate("/editproductdetails")}
              >Edit</Button>
               <Button variant="primary"
              onClick={()=>navigate("/productstable")}
              >View</Button> */}
            </Card.Body>
          </Card>
        </div>
        {/* Add more cards */}
      </div>
    </div>
  );
}

export default Dashboard;