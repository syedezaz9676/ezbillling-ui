import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from '../redux/slices/billingDetails/ezBillingDetailsSlice';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';


function formatGSTPercentage(cell) {
    // Check if cell is a number
    if (typeof cell === 'number' || !isNaN(parseFloat(cell))) {
    return cell.toString();
    }
    return cell; // Return as is if not a number
  }

const UsersTable = () =>{

const dispatch = useDispatch();
const { Users } = useSelector((state) => state.ezInvoiceDetails);

useEffect(() => {
  dispatch(getUsers())
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
        dataField: 'username',
        text: 'User Name',
        filter: textFilter({
          placeholder: 'Enter User Name',
        }),
      },
      {
        dataField: 'prefix',
        text: 'Prefix',
      },
      {
        dataField: 'address',
        text: 'Address',
      },
      {
        dataField: 'firmName',
        text: 'Firm Name',
      },
      {
        dataField: 'gstNo',
        text: 'Gst Number',
      },
      {
        dataField: 'contact',
        text: 'Contact No',
      },
      {
        dataField: 'role',
        text: 'Roles',
        formatter:formatGSTPercentage,
      },
      {
        dataField: 'state',
        text: 'State',
      },
    ];

    return (
      <div>
        <BootstrapTable
          keyField="id"
          data={ Users}
          columns={ columns }
          pagination={ paginationFactory(options) }
          filter={filterFactory()}
          filterPosition="bottom"
        />
      </div>
    );
  
}
export default UsersTable;