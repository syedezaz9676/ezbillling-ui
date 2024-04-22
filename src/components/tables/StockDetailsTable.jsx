import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStockDetailsByDgst } from '../redux/slices/billingDetails/ezBillingDetailsSlice';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

const StockDetailsTable = () =>{
  const dispatch = useDispatch();


   

  const { UserDetails } = useSelector((state) => state.ezLogin);

  const id = UserDetails.user.id;
  useEffect(() => {
      dispatch(getStockDetailsByDgst({dgst :id}))
      .unwrap()
      .then(() => {
        // navigate("/user/dashboard");
        // window.location.reload();
      })
      .catch(() => {
      });
  }, [dispatch]);

  
  const { StockDetailsByDgstAndPCom } = useSelector((state) => state.ezInvoiceDetails);
    const options = {
      // pageStartIndex: 0,
      sizePerPage: 20,
      hideSizePerPage: true,
      hidePageListOnlyOnePage: true
    };
    const columns = [
      {
        dataField: 'pname',
        text: 'Product Name',
        filter: textFilter({
          placeholder: 'Enter Product Name',
        }),
      },
      {
        dataField: 'in_stock_units',
        text: 'Units in Stock',
      },
      {
        dataField: 'last_updated_date',
        text: 'Last Updated Date',
      },
      {
        dataField: 'pcom',
        text: 'Company',
        filter: textFilter({
          placeholder: 'Enter Company Name',
        }),
      }
    ];

    return (
      <div>
        <BootstrapTable
          keyField="id"
          data={ StockDetailsByDgstAndPCom}
          columns={ columns }
          pagination={ paginationFactory(options) }
          filter={filterFactory()}
          filterPosition="bottom"
        />
      </div>
    );
  
}
export default StockDetailsTable;