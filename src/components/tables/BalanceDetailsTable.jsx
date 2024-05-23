import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBalanceDetailsByDgst } from '../redux/slices/billingDetails/ezBillingDetailsSlice';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';


function formatGSTPercentage(cell) {
    // Check if cell is a number
    console.log("cell",cell)
    if (typeof cell === 'number' || !isNaN(parseFloat(cell))) {
    return cell.toString();
    }
    return cell; // Return as is if not a number
  }

const BalanceDetailsTable = () =>{
  const dispatch = useDispatch();

  const { UserDetails } = useSelector((state) => state.ezLogin);
  const { BalanceDetailsByDgst } = useSelector((state) => state.ezInvoiceDetails);

  

  const userID = UserDetails.user.id;
  useEffect(() => {
      dispatch(getBalanceDetailsByDgst({userID}))
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
        dataField: 'cname',
        text: 'Customer Name',
        filter: textFilter({
          placeholder: 'Enter Customer Name',
        }),
      },
      {
        dataField: 'totalBalance',
        text: 'Total Balance'
      },
      {
        dataField: 'lastUpdatedDate',
        text: 'last Updated Date',
        filter: textFilter({
          placeholder: 'Search With last Updated Date',
        }),
      },
      {
        dataField: 'lastUpdateAmount',
        text: 'last Update Amount',
        filter: textFilter({
          placeholder: 'Enter last Update Amount to filter',
        }),
      },
      {
        dataField: 'reason',
        text: 'Reason',
        filter: textFilter({
          placeholder: 'Enter last Update Amount to filter',
        }),
      },
      {
        dataField: 'type',
        text: 'Update Type',
        filter: textFilter({
          placeholder: 'Enter last Update Amount to filter',
        }),
      }
      
    ];

    return (
      <div>
        <BootstrapTable
          keyField="id"
          data={ BalanceDetailsByDgst}
          columns={ columns }
          pagination={ paginationFactory(options) }
          filter={filterFactory()}
          filterPosition="bottom"
        />
      </div>
    );
  
}
export default BalanceDetailsTable;