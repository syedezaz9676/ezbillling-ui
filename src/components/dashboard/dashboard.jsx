import React, { useState, useEffect  } from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Navigate, useNavigate } from "react-router-dom";
import { hideEdit,hideBill } from "../redux/slices/ezEnableFiledSlice";
import { useDispatch, useSelector } from "react-redux";
import { hideGstDetailsOfCustomer,hideGstDetailsForHsnCode,hideInvoiceDetails,hideSalesDetails,resetInvoiceNo } from "../redux/slices/billingDetails/ezBillingDetailsSlice";

function Dashboard() {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(hideEdit());
    dispatch(hideBill());
    dispatch(hideGstDetailsOfCustomer());
    dispatch(hideGstDetailsForHsnCode());
    dispatch(hideInvoiceDetails());
    dispatch(hideSalesDetails());
    // dispatch(resetInvoiceNo());
    },[])

    let navigate = useNavigate();
  return (
    <div>
      <div className="row">
        <div className="col-md-6 col-lg-4">
          <Card>
            <Card.Body>
              <Card.Title>Customer Registration</Card.Title>
              <Card.Text>
              Register the Customer
              </Card.Text>
              <Button variant="primary" style={{ marginRight: '5px' }}
                  onClick={()=>navigate("/customerreg")}
              >Add New</Button>
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
              Register the Company
              </Card.Text>
              <Button variant="primary" style={{ marginRight: '5px' }}
              onClick={()=>navigate("/companyregistration")}
              >Add New</Button>
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
              Register the Product
              </Card.Text>
             <Button variant="primary" style={{ marginRight: '5px' }}
              onClick={()=>navigate("/productregistration")}
              >Add New</Button> 
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
              billing
              </Card.Text>
             <Button variant="primary"style={{ marginRight: '5px' }}
              onClick={()=>navigate("/generatebill")}
              >Add New</Button>
              <Button variant="primary" style={{ marginRight: '5px' }}
              onClick={()=>navigate("/editinvoice")}
              >Edit</Button>  
              <Button variant="primary" style={{ marginRight: '5px' }}
              onClick={()=>navigate("/viewinvoice")}
              >View</Button>
               <Button variant="primary" style={{ marginTop: '5px' }}
              onClick={()=>navigate("/invoices")}
              >All Invoices</Button>
              <Button variant="primary" style={{ marginTop: '5px' }}
              onClick={()=>navigate("/todaybills")}
              >Invoices</Button>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-6 col-lg-4">
          <Card>
            <Card.Body>
              <Card.Title>Reports</Card.Title>
              <Card.Text>
               Reports
              </Card.Text>
             <Button variant="primary"style={{ marginRight: '5px' }}
              onClick={()=>navigate("/gstdetailsofcustomer")}
              >Gst Details</Button>
              <Button variant="primary" style={{ marginRight: '5px' }}
              onClick={()=>navigate("/gstdetailsforhsncode")}
              >HSN Details</Button>  
              <Button variant="primary" style={{ marginRight: '5px' }}
              onClick={()=>navigate("/salesreport")}
              >Sales</Button>
              <Button variant="primary" style={{ marginTop: '5px' }}
              onClick={()=>navigate("/gstsalesreport")}
              >Gst Sales</Button>
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
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-6 col-lg-4">
          <Card>
            <Card.Body>
              <Card.Title>Admin User</Card.Title>
              <Card.Text>
              Admin Options
              </Card.Text>
             <Button variant="primary"style={{ marginRight: '5px' }}
              onClick={()=>navigate("/addusers")}
              >Add User</Button>
              <Button variant="primary" style={{ marginRight: '5px' }}
              onClick={()=>navigate("/edituser")}
              >Edit User</Button>  
              <Button variant="primary"
              onClick={()=>navigate("/usertable")}
              >View</Button>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-6 col-lg-4">
          <Card>
            <Card.Body>
              <Card.Title>Balance Details</Card.Title>
              <Card.Text>
              Balance Details
              </Card.Text>
             <Button variant="primary"style={{ marginRight: '5px' }}
              onClick={()=>navigate("/balacnedetails")}
              >Balance Details</Button>
              <Button variant="primary" style={{ marginRight: '5px' }}
              onClick={()=>navigate("/modifybalace")}
              >Edit Details</Button> 
            </Card.Body>
          </Card>
        </div>
        {/* Add more cards */}
      </div>
    </div>
  );
}

export default Dashboard;