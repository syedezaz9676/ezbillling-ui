import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import { getBillsDetails } from '../redux/slices/billingDetails/ezBillingDetailsSlice';

const BillsDetailsTable = () => {
  const dispatch = useDispatch();
  const { UserDetails } = useSelector((state) => state.ezLogin);
  const { BillsAmountDetails } = useSelector((state) => state.ezInvoiceDetails);
  const userID = UserDetails.user.id;

  const [loading, setLoading] = useState(true); // State to manage loading indicator

  useEffect(() => {
    setLoading(true); // Set loading to true before API call
    // Fetch bills details for the current user
    dispatch(getBillsDetails({ userID }))
      .unwrap()
      .then(() => {
        // Handle success if needed
      })
      .catch((error) => {
        // Handle error if needed
        console.error('Error fetching bills details:', error);
      })
      .finally(() => {
        setLoading(false); // Set loading to false after API call completes
      });
  }, [dispatch, userID]);

  // Column definitions for the table
  const columns = [
    {
      dataField: 'cno',
      text: 'Customer Name',
      filter: textFilter({
        placeholder: 'Enter Customer Name',
      }),
    },
    {
      dataField: 'bno',
      text: 'Invoice No',
      filter: textFilter({
        placeholder: 'Enter Invoice No',
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
      formatter: formatCurrency, // Custom formatter for currency
      filter: textFilter({
        placeholder: 'Enter Amount to filter',
      }),
    }
  ];

  // Options for pagination
  const options = {
    sizePerPage: 10,
    hideSizePerPage: true,
    hidePageListOnlyOnePage: true
  };

  // Custom formatter function for formatting currency
  function formatCurrency(cell, row) {
    if (typeof cell === 'number' || !isNaN(parseFloat(cell))) {
      return `$${cell.toFixed(2)}`; // Format as currency with two decimal places
    }
    return cell; // Return as is if not a number
  }

  // Render loading indicator or table based on loading state
  return (
    <div>
      {loading ? (
        <center><p>Please wait...</p></center> // Replace with your loading indicator (e.g., spinner)
      ) : (
        <BootstrapTable
          keyField="id"
          data={BillsAmountDetails}
          columns={columns}
          pagination={paginationFactory(options)}
          filter={filterFactory()}
          filterPosition="bottom"
        />
      )}
    </div>
  );
}

export default BillsDetailsTable;
