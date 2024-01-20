import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCustomerDetailsByDgst } from '../redux/ezCustomerRegistrationSlice';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

const CustomerDetailTable = () =>{
  const dispatch = useDispatch();

  const { UserDetails } = useSelector((state) => state.ezLogin);
  const { customerDetailsByDgst } = useSelector((state) => state.ezCustomerRegistration);
   

  

  const id = UserDetails.user.id;
  useEffect(() => {
      dispatch(getCustomerDetailsByDgst({id}))
      .unwrap()
      .then(() => {
        // navigate("/user/dashboard");
        // window.location.reload();
      })
      .catch(() => {
      });
  }, [dispatch]);

   console.log('customerDetailsByDgst',customerDetailsByDgst);

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
        dataField: 'ctno',
        text: 'GST Number',
        filter: textFilter({
          placeholder: 'Enter GST Number',
        }),
      },
      {
        dataField: 'cpno',
        text: 'Phone Number',
        filter: textFilter({
          placeholder: 'Enter Phone Number',
        }),
      },
      {
        dataField: 'cadd',
        text: 'Address'
      }
      ,
      {
        dataField: 'isigst',
        text: 'IGST Applicable'
      },
      {
        dataField: 'supplyplace',
        text: 'Place OF Supply',
        filter: textFilter({
          placeholder: 'Enter Place OF Supply',
        }),
      }
      ,
      {
        dataField: 'legal_name',
        text: 'Name in GST Protal'
      }
    ];

    return (
      <div>
        <BootstrapTable
          keyField="id"
          data={ customerDetailsByDgst}
          columns={ columns }
          pagination={ paginationFactory(options) }
          filter={filterFactory()}
          filterPosition="bottom"
        />
      </div>
    );
  
}
export default CustomerDetailTable;