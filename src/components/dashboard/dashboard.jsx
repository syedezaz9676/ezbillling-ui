import React, { useState, useEffect  } from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Navigate, useNavigate } from "react-router-dom";
import { hideEdit,hideBill } from "../redux/slices/ezEnableFiledSlice";
import { useDispatch, useSelector } from "react-redux";
import { hideGstDetailsOfCustomer,hideGstDetailsForHsnCode } from "../redux/slices/billingDetails/ezBillingDetailsSlice";

function Dashboard() {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(hideEdit());
    dispatch(hideBill());
    dispatch(hideGstDetailsOfCustomer());
    dispatch(hideGstDetailsForHsnCode());
    // dispatch(resetInvoiceNo());
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
              <Button variant="primary" style={{ marginRight: '5px' }}
                  onClick={()=>navigate("/customerreg")}
              >Click</Button>
              <Button variant="primary" style={{ marginRight: '5px' }}
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
              <Button variant="primary" style={{ marginRight: '5px' }}
              onClick={()=>navigate("/companyregistration")}
              >Click</Button>
              <Button variant="primary" style={{ marginRight: '5px' }}
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
             <Button variant="primary" style={{ marginRight: '5px' }}
              onClick={()=>navigate("/productregistration")}
              >Click</Button> 
              <Button variant="primary" style={{ marginRight: '5px' }}
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
             <Button variant="primary"style={{ marginRight: '5px' }}
              onClick={()=>navigate("/generatebill")}
              >Click</Button>
              <Button variant="primary" style={{ marginRight: '5px' }}
              onClick={()=>navigate("/editinvoice")}
              >Edit</Button>  
              <Button variant="primary"
              onClick={()=>navigate("/viewinvoice")}
              >View</Button>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-6 col-lg-4">
          <Card>
            <Card.Body>
              <Card.Title>Reports</Card.Title>
              <Card.Text>
              Click here for Reports
              </Card.Text>
             <Button variant="primary"style={{ marginRight: '5px' }}
              onClick={()=>navigate("/gstdetailsofcustomer")}
              >Gst Details</Button>
              <Button variant="primary" style={{ marginRight: '5px' }}
              onClick={()=>navigate("/gstdetailsforhsncode")}
              >HSN Details</Button>  
              <Button variant="primary"
              onClick={()=>navigate("/salesreport")}
              >Sales</Button>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-6 col-lg-4">
          <Card>
            <Card.Body>
              <Card.Title>Stock</Card.Title>
              <Card.Text>
              Add new Stock
              </Card.Text>
             <Button variant="primary"style={{ marginRight: '5px' }}
              onClick={()=>navigate("/addstock")}
              >Add Stock</Button>
              <Button variant="primary" style={{ marginRight: '5px' }}
              onClick={()=>navigate("/stocktable")}
              >Stock Position</Button>  
              {/* <Button variant="primary"
              onClick={()=>navigate("/viewinvoice")}
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