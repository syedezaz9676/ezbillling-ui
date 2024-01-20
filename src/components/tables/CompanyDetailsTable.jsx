import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCompanyDetails } from '../redux/slices/companydetails/ezCompanyDetailsSlice';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';


function formatGSTPercentage(cell) {
    // Check if cell is a number
    console.log("cell",cell)
    if (typeof cell === 'number' || !isNaN(parseFloat(cell))) {
    return cell.toString();
    }
    return cell; // Return as is if not a number
  }

const CompanyDetailsTable = () =>{
  const dispatch = useDispatch();

  const { UserDetails } = useSelector((state) => state.ezLogin);
  const { companyDeatils} = useSelector((state) => state.ezCompanyDetails);

  

  const userID = UserDetails.user.id;
  useEffect(() => {
      dispatch(getCompanyDetails({userID}))
      .unwrap()
      .then(() => {
        // navigate("/user/dashboard");
        // window.location.reload();
      })
      .catch(() => {
      });
  }, [dispatch]);

  

   console.log('companyDeatils',companyDeatils);

    const options = {
      // pageStartIndex: 0,
      sizePerPage: 10,
      hideSizePerPage: true,
      hidePageListOnlyOnePage: true
    };
    const columns = [
      {
        dataField: 'name',
        text: 'Company Name',
        filter: textFilter({
          placeholder: 'Enter Company Name',
        }),
      },
      {
        dataField: 'gstPercentage',
        text: 'GST Percentages',
        formatter:formatGSTPercentage,
      }
    ];

    return (
      <div>
        <BootstrapTable
          keyField="id"
          data={ companyDeatils}
          columns={ columns }
          pagination={ paginationFactory(options) }
          filter={filterFactory()}
          filterPosition="bottom"
        />
      </div>
    );
  
}
export default CompanyDetailsTable;