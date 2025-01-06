import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Grid } from '@mui/material'; // Import Grid component from Material-UI
import { getCustomerNames } from '../redux/ezCustomerRegistrationSlice';
import { useNavigate } from "react-router-dom";
import { getProductDetails } from '../redux/slices/productdetails/ezProductDetailsSlice';
import { updateOrderBillDetails, isOrderBill } from '../redux/slices/billingDetails/ezBillingDetailsSlice';

function OrderList() {
  const { UserDetails } = useSelector((state) => state.ezLogin);
  const dispatch = useDispatch();
  const userID = UserDetails.user.id;
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    dispatch(getCustomerNames({ userID }))
      .unwrap()
      .then(() => {})
      .catch(() => {});

    dispatch(getProductDetails({ userID }))
      .unwrap()
      .then(() => {})
      .catch(() => {});
  }, [dispatch]);

  const { customerNames } = useSelector(
    (state) => state.ezCustomerRegistration
  );

  function getNameById(customerNames, id) {
    const customer = customerNames.find((customer) => customer.id === id);
    return customer ? customer.cname : null;
  }

  const { productDetails } = useSelector((state) => state.ezProductDetails);

  function getProductNameById(productDetails, id) {
    const product = productDetails.find((product) => product.id === id);
    return product ? product.pname : null;
  }

  function getProductUnitsById(productDetails, id) {
    const product = productDetails.find((product) => product.id === id);
    return product ? product.unites_per : null;
  }

  const { OrderDetailsByDate, isgetOrderDetailsPending,billDetails } = useSelector(
    (state) => state.ezInvoiceDetails
  );
  

  function getOrderDetailsByOrderId(OrderDetailsByDate, id) {
    const Order = OrderDetailsByDate.find((orderDetails) => orderDetails.orderId === id);
    return Order ? Order : null;
  }
  const navigate = useNavigate();
  const handleOrderIdClick = (orderId) => {
    console.log("in orderclick")
    setSelectedOrderId(orderId);
   const selectedOrderDetails  = getOrderDetailsByOrderId(OrderDetailsByDate, orderId);
   console.log("billDetails",billDetails)

   dispatch(updateOrderBillDetails({selectedOrderDetails}));
   const isOrderBillFlag=true;
   dispatch(isOrderBill({isOrderBillFlag}));
   navigate("/generatebill");

  };

  return (
    <Grid container spacing={2}>
      {OrderDetailsByDate.map((item, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <div style={{ border: '1px solid #ccc', padding: '10px' }}> 
            <span 
              style={{ cursor: 'pointer', color: 'blue' }} 
              onClick={() => handleOrderIdClick(item.orderId)}
            >
              Order ID: {item.orderId} 
            </span>
            <p>Customer: <b>{getNameById(customerNames, item.name)}</b></p>
            <p>Date: {item.date}</p>
            <p>Ordre Taken By: {item.orderTakenBy}</p>
            <h5>Order List:</h5>
            <ul>
              {item.itemList.map((item, index) => (
                <li key={index}>
                  {item.pname} -{' '}
                  {item.noofunites} {getProductUnitsById(productDetails, item.pname)}
                </li>
              ))}
            </ul>
          </div>
        </Grid>
      ))}
    </Grid>
  );
}

export default OrderList;