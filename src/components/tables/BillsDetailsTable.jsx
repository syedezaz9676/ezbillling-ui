import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBillsDetails } from '../redux/slices/billingDetails/ezBillingDetailsSlice';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';


function formatGSTPercentage(cell) {
    // Check if cell is a number
    console.log("cell",cell)
    if (typeof cell === 'number' || !isNaN(parseFloat(cell))) {
    return cell.toString();
    }
    return cell; // Return as is if not a number
  }

const BillsDetailsTable = () =>{
  const dispatch = useDispatch();

  const { UserDetails } = useSelector((state) => state.ezLogin);
  const { BillsAmountDetails } = useSelector((state) => state.ezInvoiceDetails);

  

  const userID = UserDetails.user.id;
  useEffect(() => {
      dispatch(getBillsDetails({userID}))
      .unwrap()
      .then(() => {
        // navigate("/user/dashboard");
        // window.location.reload();
      })
      .catch(() => {
      });
  }, [dispatch]);

  

   

    const options = {
      // pageStartIndex: 0,
      sizePerPage: 10,
      hideSizePerPage: true,
      hidePageListOnlyOnePage: true
    };
    const columns = [
      {
        dataField: 'cno',
        text: 'Customer Name',
        filter: textFilter({
          placeholder: 'Enter Customer Name',
        }),
      },
      {
        dataField: 'date',
        text: 'Invoice Date',
        filter: textFilter({
          placeholder: 'Search With Date',
        }),
      },
      {
        dataField: 'amount',
        text: 'Invoice Total Amount',
        filter: textFilter({
          placeholder: 'Enter Amount to filter',
        }),
      }
      
    ];

    return (
      <div>
        <BootstrapTable
          keyField="id"
          data={ BillsAmountDetails}
          columns={ columns }
          pagination={ paginationFactory(options) }
          filter={filterFactory()}
          filterPosition="bottom"
        />
      </div>
    );
  
}
export default BillsDetailsTable;