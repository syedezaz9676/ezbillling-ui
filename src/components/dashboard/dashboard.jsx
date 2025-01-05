import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

const cardData = [
  {
    title: 'Customer',
    buttons: [
      { label: 'Add New Customer', path: '/customerreg' },
      { label: 'Edit Customer Details', path: '/editcustomerdetails' },
      { label: 'View All Customer\'s Details', path: '/customertable' },
    ]
  },
  {
    title: 'Company',
    buttons: [
      { label: 'Add New Company', path: '/companyregistration' },
      { label: 'Edit Company Details', path: '/editcompanydetails' },
      { label: 'View all Company\'s Details', path: '/companytable' },
    ]
  },
  {
    title: 'Product',
    buttons: [
      { label: 'Add New Product', path: '/productregistration' },
      { label: 'Edit Product Details', path: '/editproductdetails' },
      { label: 'View All Product\'s', path: '/productstable' },
    ]
  },
  {
    title: 'Invoice',
    text: 'Manage Invoice',
    buttons: [
      { label: 'Generate Invoice', path: '/generatebill' },
      { label: 'Edit Invoice', path: '/editinvoice' },
      { label: 'View Invoice', path: '/viewinvoice' },
      { label: 'View All Invoices', path: '/invoices' },
      { label: 'Invoices By Date', path: '/todaybills' },
      { label: 'Print Single Invoice', path: '/singlebill' },
    ]
  },
  {
    title: 'Reports',
    text: 'Generate Reports',
    buttons: [
      { label: 'GST Details', path: '/gstdetailsofcustomer' },
      { label: 'HSN Details', path: '/gstdetailsforhsncode' },
      { label: 'Sales', path: '/salesreport' },
      { label: 'GST Sales', path: '/gstsalesreport' },
      { label: 'Sales Graph', path: '/salescompare' },
      { label: 'Company Sales Graph', path: '/companysalescompare' },
      { label: 'Product Sales Report', path: '/productsaleqty' },
      { label: 'Compare Product Monlty Sale', path: '/productmonthlysalesgraph' },
    ]
  },
  {
    title: 'Stock Management',
    text: 'Manage Stock',
    buttons: [
      { label: 'Add New Stock', path: '/addstock' },
      { label: 'Check Stock Position', path: '/stocktable' },
    ]
  },
  {
    title: 'Admin User',
    text: 'Manage Admin Users & Hsn Details',
    buttons: [
      { label: 'Add User', path: '/addusers' },
      { label: 'Edit User', path: '/edituser' },
      { label: 'View User Details', path: '/usertable' },
      { label: 'Add HSN Details', path: '/addhsncodedetails' },
    ]
  },
  {
    title: 'Balance and Order Details',
    text: 'Balance and Order',
    buttons: [
      { label: 'View Balance Details', path: '/balacnedetails' },
      { label: 'Edit Balance Details', path: '/modifybalace' },
      { label: 'Place Order', path: '/placeorder' },
      { label: 'Order Details', path: '/orderdetails' },
    ]
  },
];

const isMobile = () => {
  // Implement logic to detect if the device is mobile
  // Example using window.innerWidth 
  return window.innerWidth <= 768; // Adjust breakpoint as needed
};

const get_balance_and_order_cards = (data) => {
  return data.filter((card) => card.title === 'Balance and Order Details');
};

const Dashboard = () => {
  const navigate = useNavigate();
  const filteredCards = isMobile() ? get_balance_and_order_cards(cardData) : cardData;

  return (
    <div className='container mt-4'>
      <div className='row'>
        {filteredCards.map((card, index) => (
          <div key={index} className='col-md-6 col-lg-4 mb-4'>
            <Card className='border-primary shadow-sm'>
              <Card.Body>
                <Card.Title className='text-primary'>{card.title}</Card.Title>
                <Card.Text className='text-muted'>{card.text}</Card.Text>
                <div className='d-flex flex-column'>
                  {card.buttons.map((btn, btnIndex) => (
                    <Button
                      key={btnIndex}
                      variant='outline-primary'
                      className='mb-2'
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
};

export default Dashboard;