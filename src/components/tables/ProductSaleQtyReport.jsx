import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from '../redux/slices/productdetails/ezProductDetailsSlice';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

const ProductSaleQtyReport = () =>{
  const dispatch = useDispatch();

  const { UserDetails } = useSelector((state) => state.ezLogin);
  const { productSaleQty } = useSelector((state) => state.ezInvoiceDetails);
   

  

  const userID = UserDetails.user.id;
  useEffect(() => {
      dispatch(getProductDetails({userID}))
      .unwrap()
      .then(() => {
        // navigate("/user/dashboard");
        // window.location.reload();
      })
      .catch(() => {
      });
  }, [dispatch]);

   console.log('productSaleQty',productSaleQty);

    const options = {
      // pageStartIndex: 0,
      sizePerPage: 10,
      hideSizePerPage: true,
      hidePageListOnlyOnePage: true
    };
    const columns = [
      {
        dataField: 'productName',
        text: 'Product Name',
        filter: textFilter({
          placeholder: 'Enter Product Name',
        }),
        formatter: (cell, row) => {
            return `${row.productName}`;
          },
      },
      {
        dataField: 'totalQty',
        text: 'Quantity'
      },
      {
        dataField: 'totalAmount',
        text: 'Total Sales Amount'
      }
    ];

    return (
      <div>
        <BootstrapTable
          keyField="id"
          data={ productSaleQty}
          columns={ columns }
          pagination={ paginationFactory(options) }
          filter={filterFactory()}
          filterPosition="bottom"
        />
      </div>
    );
  
}
export default ProductSaleQtyReport;