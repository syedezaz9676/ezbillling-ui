import React, { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { hideEdit, hideBill } from "../redux/slices/ezEnableFiledSlice";
import { hideGstDetailsOfCustomer, hideGstDetailsForHsnCode, hideInvoiceDetails, hideSalesDetails, resetInvoiceNo, resetMonthlySales, removeOrderDetails } from "../redux/slices/billingDetails/ezBillingDetailsSlice";
import './dashboard.css';

// Card configuration with icons and colors
const cardData = [
  {
    title: "Customer",
    icon: "👥",
    color: "#6366f1",
    description: "Manage your customers",
    buttons: [
      { label: "Add New Customer", path: "/customerreg", icon: "➕" },
      { label: "Edit Customer Details", path: "/editcustomerdetails", icon: "✏️" },
      { label: "View All Customer's Details", path: "/customertable", icon: "👁️" },
    ]
  },
  {
    title: "Company",
    icon: "🏢",
    color: "#8b5cf6",
    description: "Manage your company",
    buttons: [
      { label: "Add New Company", path: "/companyregistration", icon: "➕" },
      { label: "Edit Company Details", path: "/editcompanydetails", icon: "✏️" },
      { label: "View all Company's Details", path: "/companytable", icon: "👁️" },
    ]
  },
  {
    title: "Product",
    icon: "📦",
    color: "#06b6d4",
    description: "Manage products",
    buttons: [
      { label: "Add New Product", path: "/productregistration", icon: "➕" },
      { label: "Edit Product Details", path: "/editproductdetails", icon: "✏️" },
      { label: "View All Product's", path: "/productstable", icon: "👁️" },
    ]
  },
  {
    title: "Invoice",
    icon: "🧾",
    color: "#10b981",
    description: "Generate & manage invoices",
    buttons: [
      { label: "Generate Invoice", path: "/generatebill", icon: "✨" },
      { label: "Edit Invoice", path: "/editinvoice", icon: "✏️" },
      { label: "View Invoice", path: "/viewinvoice", icon: "👁️" },
      { label: "View All Invoices", path: "/invoices", icon: "📋" },
      { label: "Invoices By Date", path: "/todaybills", icon: "📅" },
      { label: "Print Single Invoice", path: "/singlebill", icon: "🖨️" },
    ]
  },
  {
    title: "Reports",
    icon: "📊",
    color: "#f59e0b",
    description: "Generate business reports",
    buttons: [
      { label: "GST Details", path: "/gstdetailsofcustomer", icon: "📑" },
      { label: "HSN Details", path: "/gstdetailsforhsncode", icon: "🏷️" },
      { label: "Sales", path: "/salesreport", icon: "💰" },
      { label: "GST Sales", path: "/gstsalesreport", icon: "🧮" },
      { label: "Sales Graph", path: "/salescompare", icon: "📈" },
      { label: "Company Sales Graph", path: "/companysalescompare", icon: "🏢" },
      { label: "Product Sales Report", path: "/productsaleqty", icon: "📦" },
      { label: "Compare Product Monlty Sale", path: "/productmonthlysalesgraph", icon: "📊" },
    ]
  },
  {
    title: "Stock Management",
    icon: "📈",
    color: "#ec4899",
    description: "Manage inventory",
    buttons: [
      { label: "Add New Stock", path: "/addstock", icon: "➕" },
      { label: "Check Stock Position", path: "/stocktable", icon: "🔍" },
    ]
  },
  {
    title: "Admin User",
    icon: "⚙️",
    color: "#64748b",
    description: "User management",
    buttons: [
      { label: "Add User", path: "/addusers", icon: "➕" },
      { label: "Edit User", path: "/edituser", icon: "✏️" },
      { label: "View User Details", path: "/usertable", icon: "👁️" },
      { label: "Add HSN Details", path: "/addhsncodedetails", icon: "🏷️" },
    ]
  },
  {
    title: "Balance Details",
    icon: "💳",
    color: "#14b8a6",
    description: "Financial management",
    buttons: [
      { label: "View Balance Details", path: "/balacnedetails", icon: "👁️" },
      { label: "Edit Balance Details", path: "/modifybalace", icon: "✏️" },
      { label: 'Place Order', path: '/placeorder', icon: '🛒' },
      { label: 'Order Details', path: '/orderdetails', icon: '📦' },
    ]
  },
];

const mobileCardData = [
  {
    title: "Balance Details",
    icon: "💳",
    color: "#14b8a6",
    description: "Financial management",
    buttons: [
      { label: "View Balance Details", path: "/balacnedetails", icon: "👁️" },
      { label: "Edit Balance Details", path: "/modifybalace", icon: "✏️" },
      { label: 'Place Order', path: '/placeorder', icon: '🛒' },
      { label: 'Order Details', path: '/orderdetails', icon: '📦' },
    ]
  },
];

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
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
    <div className="dashboard-wrapper">
      <div className="dashboard-header">
        <div className="header-content">
          <h1 className="dashboard-title">Dashboard</h1>
          <p className="dashboard-subtitle">Manage your billing and business operations</p>
        </div>
        <div className="header-actions">
          <Button 
            variant="primary" 
            className="quick-action-btn"
            onClick={() => navigate("/generatebill")}
          >
            <span>✨</span> New Invoice
          </Button>
        </div>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' }}>📊</div>
          <div className="stat-info">
            <span className="stat-label">Quick Access</span>
            <span className="stat-value">8 Categories</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)' }}>🧾</div>
          <div className="stat-info">
            <span className="stat-label">Invoices</span>
            <span className="stat-value">Manage All</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)' }}>📈</div>
          <div className="stat-info">
            <span className="stat-label">Reports</span>
            <span className="stat-value">Analytics</span>
          </div>
        </div>
      </div>

      <div className="cards-grid">
        {cards.map((card, index) => (
          <Card 
            key={index} 
            className="dashboard-card animate-fadeIn"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <Card.Body>
              <div className="card-header">
                <div 
                  className="card-icon" 
                  style={{ background: `linear-gradient(135deg, ${card.color} 0%, ${card.color}cc 100%)` }}
                >
                  {card.icon}
                </div>
                <div className="card-title-section">
                  <Card.Title className="card-title">{card.title}</Card.Title>
                  <Card.Text className="card-description">{card.description}</Card.Text>
                </div>
              </div>
              
              <div className="card-buttons">
                {card.buttons.map((btn, btnIndex) => (
                  <Button
                    key={btnIndex}
                    variant="outline-primary"
                    className="card-btn"
                    onClick={() => navigate(btn.path)}
                  >
                    <span className="btn-icon">{btn.icon}</span>
                    {btn.label}
                  </Button>
                ))}
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
