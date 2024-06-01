import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const GSTSalesTable = () => {
  // Calculate the sum of totalAmountAfterDisc
  
  const {GstSalesOfCustomer,GstSalesOfGstCustomer,isgetGstSalesOfCustomersPending,isgetGstSalesOfGstCustomersPending } = useSelector((state) => state.ezInvoiceDetails);
  const totalAmountSum = GstSalesOfCustomer.reduce((sum, detail) => sum + detail.totalAmountAfterDisc, 0);
  const totalAmountSumofGstCustomers = GstSalesOfGstCustomer.reduce((sum, detail) => sum + detail.totalAmountAfterDisc, 0);
  const totalTaxableAmountSum = GstSalesOfCustomer.reduce((sum, detail) => sum + detail.taxableAmount, 0);
  const totalTaxableAmountSumofGstCustomers = GstSalesOfGstCustomer.reduce((sum, detail) => sum + detail.taxableAmount, 0);
  
  return (<div>
    <center>
    <div><h3>Sales Per GST Of All Customers</h3></div>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><b>Product GST (%)</b></TableCell>
            <TableCell><b>Total Taxable Amount</b></TableCell>
            <TableCell><b>Total Amount</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {GstSalesOfCustomer.map((detail, index) => (
            <TableRow key={index}>
              <TableCell>{detail.productGst}</TableCell>
              <TableCell>{detail.taxableAmount.toFixed(2)}</TableCell>
              <TableCell>{detail.totalAmountAfterDisc.toFixed(2)}</TableCell>
            </TableRow>
          ))}
          {/* Additional row for the sum */}
          <TableRow>
          <TableCell><strong>Total:</strong></TableCell>
          <TableCell><b>{totalTaxableAmountSum.toFixed(2)}</b> </TableCell>
            <TableCell><b>{totalAmountSum.toFixed(2)}</b> </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <div><h3>Sales Per GST Of Customers with Gst No</h3></div>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
          <TableCell><b>Product GST (%)</b></TableCell>
          <TableCell><b>Total Taxable Amount</b></TableCell>
            <TableCell><b>Total Amount</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {GstSalesOfGstCustomer.map((detail, index) => (
            <TableRow key={index}>
              <TableCell>{detail.productGst}</TableCell>
              <TableCell>{detail.taxableAmount.toFixed(2)}</TableCell>
              <TableCell>{detail.totalAmountAfterDisc.toFixed(2)}</TableCell>
            </TableRow>
          ))}
          {/* Additional row for the sum */}
          <TableRow>
          <TableCell><strong>Total:</strong></TableCell>
          <TableCell><b>{totalTaxableAmountSumofGstCustomers.toFixed(2)}</b> </TableCell>
            <TableCell><b>{totalAmountSumofGstCustomers.toFixed(2)}</b> </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    </center>
    </div>
  );
};

export default GSTSalesTable;
