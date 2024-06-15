import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';



const ReportingTable = ({ data }) => {
  const { GstDetailsOfCustomer, isGstDetailsOfCustomerPending } = useSelector((state) => state.ezInvoiceDetails);

  const tableStyle = {
    borderCollapse: 'collapse',
  };

  // Combine styles for data cells (including centering)
  const cellStyle = {
    border: '1px solid #ddd',
    
    padding: '5px',
    textAlign: 'center',
    width: '150px', // Adjust width as needed
  };

  // Inherit styles from cellStyle for headers, add optional background color
  const headerCellStyle = {
    ...cellStyle,
    backgroundColor: '#f2f2f2',
  };

  return(
    <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
        <TableCell><b>Customer Name</b></TableCell>
        <TableCell><b>GST No</b></TableCell>
        <TableCell><b>Bill No</b></TableCell>
        <TableCell><b>Billing Date</b></TableCell>
        <TableCell><b>GST</b></TableCell>
        <TableCell><b>Taxable Amount</b></TableCell>
        <TableCell><b>Total Taxable Amount</b></TableCell>
        <TableCell><b>Total Amount</b></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {GstDetailsOfCustomer && GstDetailsOfCustomer.map((customer, index) => (
          customer && customer.billGstDetails.map((bill, billIndex) => (
            <TableRow key={`${index}-${billIndex}`}>
              <TableCell>{customer.customerName}</TableCell>
              <TableCell>{customer.gstNo}</TableCell>
              <TableCell>{bill.sumOfGsts[0].bno}</TableCell>
              <TableCell>{bill.sumOfGsts[0].billingDate}</TableCell>
              <TableCell>
                {bill && bill.sumOfGsts.map((gst, gstIndex) => (
                  <div key={`${index}-${billIndex}-${gstIndex}`}>{gst.gst}%</div>
                ))}
              </TableCell>
              <TableCell>
                {bill && bill.sumOfGsts.map((gst, gstIndex) => (
                  <div key={`${index}-${billIndex}-${gstIndex}`}>{gst.sumOfGstAmount.toFixed(2)}</div>
                ))}
              </TableCell>
              <TableCell>{bill.totalTaxableSum.toFixed(2)}</TableCell>
              <TableCell>{bill.totalofSum.toFixed(2)}</TableCell>
            </TableRow>
          ))
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  );
};

export default ReportingTable;
