import React, { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { hideEdit, hideBill } from "../redux/slices/ezEnableFiledSlice";
import { hideGstDetailsOfCustomer, hideGstDetailsForHsnCode, hideInvoiceDetails, hideSalesDetails, resetInvoiceNo, resetMonthlySales, removeOrderDetails } from "../redux/slices/billingDetails/ezBillingDetailsSlice";

const cardData = [
  {
    title: "Customer",
    buttons: [
      { label: "Add New Customer", path: "/customerreg" },
      { label: "Edit Customer Details", path: "/editcustomerdetails" },
      { label: "View All Customer's Details", path: "/customertable" },
    ]
  },
  {
    title: "Company",
    buttons: [
      { label: "Add New Company", path: "/companyregistration" },
      { label: "Edit Company Details", path: "/editcompanydetails" },
      { label: "View all Company's Details", path: "/companytable" },
    ]
  },
  {
    title: "Product",
    buttons: [
      { label: "Add New Product", path: "/productregistration" },
      { label: "Edit Product Details", path: "/editproductdetails" },
      { label: "View All Product's", path: "/productstable" },
    ]
  },
  {
    title: "Invoice",
    text: "Manage Invoice",
    buttons: [
      { label: "Generate Invoice", path: "/generatebill" },
      { label: "Edit Invoice", path: "/editinvoice" },
      { label: "View Invoice", path: "/viewinvoice" },
      { label: "View All Invoices", path: "/invoices" },
      { label: "Invoices By Date", path: "/todaybills" },
      { label: "Print Single Invoice", path: "/singlebill" },
    ]
  },
  {
    title: "Reports",
    text: "Generate Reports",
    buttons: [
      { label: "GST Details", path: "/gstdetailsofcustomer" },
      { label: "HSN Details", path: "/gstdetailsforhsncode" },
      { label: "Sales", path: "/salesreport" },
      { label: "GST Sales", path: "/gstsalesreport" },
      { label: "Sales Graph", path: "/salescompare" },
      { label: "Company Sales Graph", path: "/companysalescompare" },
      { label: "Product Sales Report", path: "/productsaleqty" },
      { label: "Compare Product Monlty Sale", path: "/productmonthlysalesgraph" },
    ]
  },
  {
    title: "Stock Management",
    text: "Manage Stock",
    buttons: [
      { label: "Add New Stock", path: "/addstock" },
      { label: "Check Stock Position", path: "/stocktable" },
      // { label: "Place Order", path: "/placeorder" }, 
    ]
  },
  {
    title: "Admin User",
    text: "Manage Admin Users & Hsn Details",
    buttons: [
      { label: "Add User", path: "/addusers" },
      { label: "Edit User", path: "/edituser" },
      { label: "View User Details", path: "/usertable" },
      { label: "Add HSN Details", path: "/addhsncodedetails" },
    ]
  },
  {
    title: "Balance Details",
    text: "View Balance Information",
    buttons: [
      { label: "View Balance Details", path: "/balacnedetails" },
      { label: "Edit Balance Details", path: "/modifybalace" },
      { label: 'Place Order', path: '/placeorder' },
      { label: 'Order Details', path: '/orderdetails' },
    ]
  },
];

const mobileCardData = [
  {
    title: "Balance Details",
    text: "View Balance Information",
    buttons: [
      { label: "View Balance Details", path: "/balacnedetails" },
      { label: "Edit Balance Details", path: "/modifybalace" },
      { label: 'Place Order', path: '/placeorder' },
      { label: 'Order Details', path: '/orderdetails' },
    ]
  },
];

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust breakpoint as needed
    };

    handleResize(); // Initial check on mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    dispatch(hideEdit());
    dispatch(hideBill());
    dispatch(hideGstDetailsOfCustomer());
    dispatch(hideGstDetailsForHsnCode());
    dispatch(hideInvoiceDetails());
    dispatch(hideSalesDetails());
    dispatch(removeOrderDetails());
  }, [dispatch]);

  const cards = isMobile ? mobileCardData : cardData;

  return (
    <div className="container mt-4">
      <div className="row">
        {cards.map((card, index) => (
          <div key={index} className="col-md-6 col-lg-4 mb-4">
            <Card className="border-primary shadow-sm">
              <Card.Body>
                <Card.Title className="text-primary">{card.title}</Card.Title>
                <Card.Text className="text-muted">{card.text}</Card.Text>
                <div className="d-flex flex-column">
                  {card.buttons.map((btn, btnIndex) => (
                    <Button
                      key={btnIndex}
                      variant="outline-primary"
                      className="mb-2"
                      onClick={() => navigate(btn.path)}
                    >
                      {btn.label}
                    </Button>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;