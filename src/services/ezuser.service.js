import axios from 'axios'

const API_URL = "http://localhost:8080";
// const API_URL = "https://0b02-171-76-85-220.ngrok-free.app";


const getGstCodeDetails = () => {
  console.log('getGstCodeDetails')
  return axios.get(API_URL+'/getgstcodedetails')
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
  return axios.post(API_URL+'/savecompanydetails',
    companyrDetails
  )
    .then(response => {
      return response;
    });
};

const getCompanyDetails = (userID) => {
  return axios.get(API_URL+'/getcompanydetails/' + userID)
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
  return axios.post(API_URL+'/saveproductdetails',
    productDetails
  )
    .then(response => {
      console.log('productDetails res', response)
      return response;
    });
};

const getProductDetails = (userID) => {
  return axios.get(API_URL+'/getproductdetails/' + userID)
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
  return axios.get(API_URL+'/getproductnames/' + userID)
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
  return axios.get(API_URL+'/getproductdetailsbyid/' + id)
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
  return axios.get(API_URL+'/getproductsbycompany/' + cName)
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
  return axios.get(API_URL+'/getcompanynames/' + userId)
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
  return axios.get(API_URL+'/getcustomernames/' + userID)
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
  return axios.get(API_URL+'/getcompanydetailsbyid/' + userId)
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
  return axios.get(API_URL+'/getcustomerdetailsbyid/' + id)
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
  return axios.get(API_URL+'/getcustomerdetailsbydgst/' + id)
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
  return axios.post(API_URL+'/savebillingdetails',
  BillingDetails
  )
    .then(response => {
      console.log('saveBilling resp', response)
      return response;
    });
};

const getInvoiceDetails = (InvoiceNo) => {
  return axios.get(API_URL+'/getbillDetailsbyinvoiceno/' + InvoiceNo)
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
  return axios.get(API_URL+'/getinvoicebyinvoiceno/' + InvoiceNo)
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
  return axios.post(API_URL+'/updatebillingdetails',
  BillingDetails
  )
    .then(response => {
      console.log('updatebillingdetails resp', response)
      return response;
    });
};

const getGstDetailsOfCustomer = (dates) => {
  console.log('dates', dates);

  return axios.get(API_URL+'/getgstdetails', {params: {
    startDate: dates.startDate,
    endDate: dates.endDate
  }})
  .then(response => {
    return response;
  });
};

const getGstDetailsForHsnCode = (dates) => {
  console.log('dates', dates);

  return axios.get(API_URL+'/gethsngstdetails', {params: {
    startDate: dates.startDate,
    endDate: dates.endDate
  }})
  .then(response => {
    return response;
  });
};

const getStockDetailsByID = (id) => {
  return axios.get(API_URL+'/getstockdetailsbyid/' + id)
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
  return axios.post(API_URL+'/savestockdetails',
  StockDetails
  )
    .then(response => {
      console.log('saveBilling resp', response)
      return response;
    });
};

const getStockDetailsByDgst = (dgst) => {
  return axios.get(API_URL+'/getstockbypcomanddgst/' + dgst )
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

  return axios.get(API_URL+'/getsalesdetails', {params: {
    startDate: dates.startDate,
    endDate: dates.endDate
  }})
  .then(response => {
    return response;
  });
};

const saveUser = (user) => {
  console.log('request', user)
  return axios.post(API_URL+'/saveuser',
  user
  )
    .then(response => {
      console.log('saveBilling resp', response)
      return response;
    });
};

const getUsers = () => {
  console.log('users')
  return axios.get(API_URL+'/getusers')
  .then(response => {
    return response;
  });
};

const getUser = (userName) => {

  return axios.get(API_URL+'/getuser/'+ userName)
  .then(response => {
    return response;
  });
};

const getBillsDetails = (userID) => {
  return axios.get(API_URL+'/getbillsamount/'+userID)
  .then(response => {
    return response;
  });
};

const getBalanceDetailsByDgst = (userID) => {
  return axios.get(API_URL+'/getbalancedetails/'+userID)
  .then(response => {
    return response;
  });
};

const getBalanceDetailsById = (id) => {
  return axios.get(API_URL+'/getbalancedetailsbyid/'+id)
  .then(response => {
    return response;
  });
};


const modifyBalanceDetails = (BalanceDetails) => {
  console.log('balanceDetails', BalanceDetails)
  return axios.post(API_URL+'/modifybalancedetails',
  BalanceDetails
  )
    .then(response => {
      console.log('balanceDetails resp', response)
      return response;
    });
};

const getGstSalesOfGstCustomers = (dates) => {
  console.log('dates', dates);

  return axios.get(API_URL+'/getgstsalesofgstcusotmers', {params: {
    startDate: dates.startDate,
    endDate: dates.endDate
  }})
  .then(response => {
    return response;
  });
};

const getGstSalesOfCustomers = (dates) => {
  console.log('dates', dates);

  return axios.get(API_URL+'/getgstsalesofcusotmers', {params: {
    startDate: dates.startDate,
    endDate: dates.endDate
  }})
  .then(response => {
    return response;
  });
};

const getBillsByDate = (details) => {
  console.log('details', details);

  return axios.get(API_URL+'/getbillbydate', {params: {
    date: details.date,
    dgst: details.dgst
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
  getSalesDetails,
  saveUser,
  getUsers,
  getUser,
  getBillsDetails,
  getBalanceDetailsByDgst,
  getBalanceDetailsById,
  modifyBalanceDetails,
  getGstSalesOfGstCustomers,
  getGstSalesOfCustomers,
  getBillsByDate

}
export default UserService;
