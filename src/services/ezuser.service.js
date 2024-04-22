import axios from 'axios'

const getGstCodeDetails = () => {
  console.log('getGstCodeDetails')
  return axios.get('http://localhost:8080/getgstcodedetails')
    .then(response => {
      // setData(response.data);
      console.log(response.data);
      return response;
    })
    .catch(error => {
      // setError(error);
      console.log(error);
    })
};

const saveCompanyDetails = (companyrDetails) => {
  console.log('companyrDetails', companyrDetails)
  return axios.post('http://localhost:8080/savecompanydetails',
    companyrDetails
  )
    .then(response => {
      return response;
    });
};

const getCompanyDetails = (userID) => {
  return axios.get('http://localhost:8080/getcompanydetails/' + userID)
    .then(response => {
      console.log(response.data);
      return response;
    })
    .catch(error => {
      // setError(error);
      console.log(error);
    })
};

const saveProductDetails = (productDetails) => {
  console.log('productDetails', productDetails)
  return axios.post('http://localhost:8080/saveproductdetails',
    productDetails
  )
    .then(response => {
      console.log('productDetails res', response)
      return response;
    });
};

const getProductDetails = (userID) => {
  return axios.get('http://localhost:8080/getproductdetails/' + userID)
    .then(response => {
      console.log(response.data);
      return response;
    })
    .catch(error => {
      // setError(error);
      console.log(error);
    })
};

const getProductNames = (userID) => {
  return axios.get('http://localhost:8080/getproductnames/' + userID)
    .then(response => {
      console.log(response.data);
      return response;
    })
    .catch(error => {
      // setError(error);
      console.log(error);
    })
};

const getProductDetailsByID = (id) => {
  return axios.get('http://localhost:8080/getproductdetailsbyid/' + id)
    .then(response => {
      console.log(response.data);
      return response;
    })
    .catch(error => {
      // setError(error);
      console.log(error);
    })
};

const getProductDetailsByCompany = (cName) => {
  return axios.get('http://localhost:8080/getproductsbycompany/' + cName)
    .then(response => {
      console.log(response.data);
      return response;
    })
    .catch(error => {
      // setError(error);
      console.log(error);
    })
};

const getCompanyNames = (userId) => {
  return axios.get('http://localhost:8080/getcompanynames/' + userId)
    .then(response => {
      console.log(response.data);
      return response;
    })
    .catch(error => {
      // setError(error);
      console.log(error);
    })
};

const getCustomerNames = (userID) => {
  return axios.get('http://localhost:8080/getcustomernames/' + userID)
    .then(response => {
      console.log(response.data);
      return response;
    })
    .catch(error => {
      // setError(error);
      console.log(error);
    })
};

const getCompanyDetailsByID = (userId) => {
  return axios.get('http://localhost:8080/getcompanydetailsbyid/' + userId)
    .then(response => {
      console.log(response.data);
      return response;
    })
    .catch(error => {
      // setError(error);
      console.log(error);
    })
};

const getCustomerDetailsByID = (id) => {
  return axios.get('http://localhost:8080/getcustomerdetailsbyid/' + id)
    .then(response => {
      console.log(response.data);
      return response;
    })
    .catch(error => {
      // setError(error);
      console.log(error);
    })
};

const getCustomerDetailsByDgst = (id) => {
  return axios.get('http://localhost:8080/getcustomerdetailsbydgst/' + id)
    .then(response => {
      console.log(response.data);
      return response;
    })
    .catch(error => {
      // setError(error);
      console.log(error);
    })
};

const saveBillDetails = (BillingDetails) => {
  console.log('formValues', BillingDetails)
  return axios.post('http://localhost:8080/savebillingdetails',
  BillingDetails
  )
    .then(response => {
      console.log('saveBilling resp', response)
      return response;
    });
};

const getInvoiceDetails = (InvoiceNo) => {
  return axios.get('http://localhost:8080/getbillDetailsbyinvoiceno/' + InvoiceNo)
    .then(response => {
      console.log(response.data);
      return response;
    })
    .catch(error => {
      // setError(error);
      console.log(error);
    })
};

const getBillDetails = (InvoiceNo) => {
  return axios.get('http://localhost:8080/getinvoicebyinvoiceno/' + InvoiceNo)
    .then(response => {
      console.log(response.data);
      return response;
    })
    .catch(error => {
      // setError(error);
      console.log(error);
    })
};

const updateBillDetails = (BillingDetails) => {
  console.log('formValues', BillingDetails)
  return axios.post('http://localhost:8080/updatebillingdetails',
  BillingDetails
  )
    .then(response => {
      console.log('updatebillingdetails resp', response)
      return response;
    });
};

const getGstDetailsOfCustomer = (dates) => {
  console.log('dates', dates);

  return axios.get('http://localhost:8080/getgstdetails', {params: {
    startDate: dates.startDate,
    endDate: dates.endDate
  }})
  .then(response => {
    return response;
  });
};

const getGstDetailsForHsnCode = (dates) => {
  console.log('dates', dates);

  return axios.get('http://localhost:8080/gethsngstdetails', {params: {
    startDate: dates.startDate,
    endDate: dates.endDate
  }})
  .then(response => {
    return response;
  });
};

const getStockDetailsByID = (id) => {
  return axios.get('http://localhost:8080/getstockdetailsbyid/' + id)
    .then(response => {
      console.log(response.data);
      return response;
    })
    .catch(error => {
      // setError(error);
      console.log(error);
    })
};

const saveStockDetails = (StockDetails) => {
  console.log('request', StockDetails)
  return axios.post('http://localhost:8080/savestockdetails',
  StockDetails
  )
    .then(response => {
      console.log('saveBilling resp', response)
      return response;
    });
};

const getStockDetailsByDgst = (dgst) => {
  return axios.get('http://localhost:8080/getstockbypcomanddgst/' + dgst )
    .then(response => {
      console.log(response.data);
      return response;
    })
    .catch(error => {
      // setError(error);
      console.log(error);
    })
};

const getSalesDetails = (dates) => {
  console.log('dates', dates);

  return axios.get('http://localhost:8080/getsalesdetails', {params: {
    startDate: dates.startDate,
    endDate: dates.endDate
  }})
  .then(response => {
    return response;
  });
};

const UserService = {
  getGstCodeDetails,
  saveCompanyDetails,
  getCompanyDetails,
  saveProductDetails,
  getProductDetails,
  getProductNames,
  getProductDetailsByID,
  getCompanyNames,
  getCustomerNames,
  getCompanyDetailsByID,
  getCustomerDetailsByID,
  getProductDetailsByCompany,
  getCustomerDetailsByDgst,
  saveBillDetails,
  getInvoiceDetails,
  getBillDetails,
  updateBillDetails,
  getGstDetailsOfCustomer,
  getGstDetailsForHsnCode,
  getStockDetailsByID,
  saveStockDetails,
  getStockDetailsByDgst,
  getSalesDetails

}
export default UserService;
