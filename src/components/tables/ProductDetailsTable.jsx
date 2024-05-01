import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from '../redux/slices/productdetails/ezProductDetailsSlice';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

const ProductDetailsTable = () =>{
  const dispatch = useDispatch();

  const { UserDetails } = useSelector((state) => state.ezLogin);
  const { productDetails } = useSelector((state) => state.ezProductDetails);
   

  

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

   console.log('productDetails',productDetails);

    const options = {
      // pageStartIndex: 0,
      sizePerPage: 10,
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
        dataField: 'mrp',
        text: 'MRP'
      },
      {
        dataField: 'rate',
        text: 'RATE'
      },
      {
        dataField: 'pcom',
        text: 'Company',
        filter: textFilter({
            placeholder: 'Enter Company Name',
          }),
      }
      ,
      {
        dataField: 'vatp',
        text: 'GST Percentage',
        filter: textFilter({
          placeholder: 'Search By GST Percentage',
        }),
      },
      {
        dataField: 'unites_per',
        text: 'Unite',
        filter: textFilter({
          placeholder: 'Search By Unite',
        }),
      },
      {
        dataField: 'is_sp',
        text: 'is a Single Piece'
      },
      {
        dataField: 'rel_prod',
        text: 'Main Product'
      },
      {
        dataField: 'cess',
        text: 'Cess'
      },
      {
        dataField: 'hsn_code',
        text: 'Hsn Code',
        filter: textFilter({
          placeholder: 'Enter Hsn Code',
        }),
      }
    ];

    return (
      <div>
        <BootstrapTable
          keyField="id"
          data={ productDetails}
          columns={ columns }
          pagination={ paginationFactory(options) }
          filter={filterFactory()}
          filterPosition="bottom"
        />
      </div>
    );
  
}
export default ProductDetailsTable;