import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';



const HsnCodeReportingTable = () => {
  const {GstDetailsforHsnCode,isGstDetailsForHsncodePending } = useSelector((state) => state.ezInvoiceDetails);

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
    fontWeight: 'bold', // Make text bold
    fontSize: '1.2rem', // Increase font size
  };

  return(
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="h6">HSN Code</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="h6">Product GST</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="h6">Total Quantity</Typography>
            </TableCell>
            {/* <TableCell align="right">Tax Amount</TableCell> */}
            <TableCell align="right">
              <Typography variant="h6">Total Taxble Amount</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="h6">SGST</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="h6">CGST</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="h6">IGST</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {GstDetailsforHsnCode && GstDetailsforHsnCode.map((item, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {item.hsn_code}
              </TableCell>
              <TableCell align="right">{item.product_gst}</TableCell>
              <TableCell align="right">{item.totalQty}</TableCell>
              {/* <TableCell align="right">{item.taxAmount}</TableCell> */}
              <TableCell align="right">{item.taxableAmount.toFixed(2)}</TableCell>
              <TableCell align="right">{item.sgst.toFixed(2)}</TableCell>
              <TableCell align="right">{item.cgst.toFixed(2)}</TableCell>
              <TableCell align="right">{item.igst.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default HsnCodeReportingTable;
