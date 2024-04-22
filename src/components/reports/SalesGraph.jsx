import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const SalesGraph = ({data}) => {
    // Calculate total amount
    const totalAmount = data.reduce((acc, item) => acc + item.totalAmount, 0);

    return (
        <div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><h3>Product Company</h3></TableCell>
                            <TableCell><h3>Sales</h3></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{item.product_company}</TableCell>
                                <TableCell>{item.totalAmount}</TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                                <TableCell><h5>Total</h5></TableCell>
                                <TableCell><h5>{totalAmount}</h5></TableCell>
                            </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            {/* <div><center>Total: <b>{totalAmount}</b></center></div> */}
        </div>
    );
};

export default SalesGraph;
