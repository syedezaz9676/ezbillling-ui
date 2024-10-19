import axios from 'axios'

const API_URL = "http://localhost:8080";


const getGstCodeDetails = () => {
  console.log('getGstCodeDetails')
  return axios.get(API_URL+'/getgstcodedetails')
    .then(response => {
      return response;
    })
    .catch(error => {
      console.log(error);
    })
};

const saveCompanyDetails = (companyrDetails) => {
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
      return response;
    })
    .catch(error => {
      console.log(error);
    })
};

const saveProductDetails = (productDetails) => {
  return axios.post(API_URL+'/saveproductdetails',
    productDetails
  )
    .then(response => {
      return response;
    });
};

const getProductDetails = (userID) => {
  return axios.get(API_URL+'/getproductdetails/' + userID)
    .then(response => {
      return response;
    })
    .catch(error => {
      console.log(error);
    })
};

const getProductNames = (userID) => {
  return axios.get(API_URL+'/getproductnames/' + userID)
    .then(response => {
      return response;
    })
    .catch(error => {
      console.log(error);
    })
};

const getProductDetailsByID = (id) => {
  return axios.get(API_URL+'/getproductdetailsbyid/' + id)
    .then(response => {
      return response;
    })
    .catch(error => {
      console.log(error);
    })
};

const getProductDetailsByCompany = (cName) => {
  return axios.get(API_URL+'/getproductsbycompany/' + cName)
    .then(response => {
      return response;
    })
    .catch(error => {
      console.log(error);
    })
};

const getCompanyNames = (userId) => {
  return axios.get(API_URL+'/getcompanynames/' + userId)
    .then(response => {
      return response;
    })
    .catch(error => {
      console.log(error);
    })
};

const getCustomerNames = (userID) => {
  return axios.get(API_URL+'/getcustomernames/' + userID)
    .then(response => {
      return response;
    })
    .catch(error => {
      console.log(error);
    })
};

const getCompanyDetailsByID = (userId) => {
  return axios.get(API_URL+'/getcompanydetailsbyid/' + userId)
    .then(response => {
      return response;
    })
    .catch(error => {
      console.log(error);
    })
};

const getCustomerDetailsByID = (id) => {
  return axios.get(API_URL+'/getcustomerdetailsbyid/' + id)
    .then(response => {
      return response;
    })
    .catch(error => {
      console.log(error);
    })
};

const getCustomerDetailsByDgst = (id) => {
  return axios.get(API_URL+'/getcustomerdetailsbydgst/' + id)
    .then(response => {
      return response;
    })
    .catch(error => {
      console.log(error);
    })
};

const saveBillDetails = (BillingDetails) => {
  return axios.post(API_URL+'/savebillingdetails',
  BillingDetails
  )
    .then(response => {
      return response;
    });
};

const getInvoiceDetails = (InvoiceNo) => {
  return axios.get(API_URL+'/getbillDetailsbyinvoiceno/' + InvoiceNo)
    .then(response => {
      return response;
    })
    .catch(error => {
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
      console.log(error);
    })
};

const updateBillDetails = (BillingDetails) => {
  return axios.post(API_URL+'/updatebillingdetails',
  BillingDetails
  )
    .then(response => {
      return response;
    });
};

const getGstDetailsOfCustomer = (dates) => {

  return axios.get(API_URL+'/getgstdetails', {params: {
    startDate: dates.startDate,
    endDate: dates.endDate,
    dgst: dates.dgst
  }})
  .then(response => {
    return response;
  });
};

const getGstDetailsForHsnCode = (dates) => {

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
      return response;
    })
    .catch(error => {
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
      return response;
    })
    .catch(error => {
      console.log(error);
    })
};

const getSalesDetails = (dates) => {
  return axios.get(API_URL+'/getsalesdetails', {params: {
    startDate: dates.startDate,
    endDate: dates.endDate
  }})
  .then(response => {
    return response;
  });
};

const saveUser = (user) => {
  return axios.post(API_URL+'/saveuser',
  user
  )
    .then(response => {
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
  return axios.post(API_URL+'/modifybalancedetails',
  BalanceDetails
  )
    .then(response => {
      console.log('balanceDetails resp', response)
      return response;
    });
};

const getGstSalesOfGstCustomers = (dates) => {
  return axios.get(API_URL+'/getgstsalesofgstcusotmers', {params: {
    startDate: dates.startDate,
    endDate: dates.endDate
  }})
  .then(response => {
    return response;
  });
};

const getGstSalesOfCustomers = (dates) => {
  return axios.get(API_URL+'/getgstsalesofcusotmers', {params: {
    startDate: dates.startDate,
    endDate: dates.endDate
  }})
  .then(response => {
    return response;
  });
};

const getBillsByDate = (details) => {
  return axios.get(API_URL+'/getbillbydate', {params: {
    date: details.date,
    dgst: details.dgst
  }})
  .then(response => {
    return response;
  });
};

const getMontlySales = () => {
  return axios.get(API_URL+'/sixmonthssale')
  .then(response => {
    return response;
  });
};

const getMonthlyCompanySales = (details) => {
  console.log('details', details);

  return axios.get(API_URL+'/getcompanymonthlysales', {params: {
    company: details.company,
    months: details.months
  }})
  .then(response => {
    return response;
  });
};

const gstHsncodeDetails = () => {
  return axios.get(API_URL+'/gethsncodes')
  .then(response => {
    return response;
  });
};

const saveHsnCodeDetails = (HsnCodeDetails) => {
  return axios.post(API_URL+'/addhsndetails',
    HsnCodeDetails
  )
    .then(response => {
      return response;
    });
};

const deActivateCustomer = (id) => {
  return axios.post(API_URL+'/deactivatecustomer/'+id)
    .then(response => {
      return response;
    });
};

const deActivateProduct = (id) => {
  return axios.post(API_URL+'/deactivateproduct/'+id)
    .then(response => {
      return response;
    });
};

const deActivateCompany = (id) => {
  return axios.post(API_URL+'/deactivatecompany/'+id)
    .then(response => {
      return response;
    });
};

const getProductSales = (details) => {

  return axios.get(API_URL+'/getproductsalesqty', {params: {
    startDate: details.startDate,
    endDate: details.endDate,
    productCompany: details.productCompany    
  }})
  .then(response => {
    return response;
  });
};

const getProductSalesMontly = (details) => {

  return axios.get(API_URL+'/getproductsalesqtymonthly', {params: {
    productName: details.productName,
    noOfMonths: details.noOfMonths,
    productCompany: details.productCompany    
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
  getBillsByDate,
  getMontlySales,
  getMonthlyCompanySales,
  gstHsncodeDetails,
  saveHsnCodeDetails,
  deActivateCustomer,
  deActivateProduct,
  deActivateCompany,
  getProductSales,
  getProductSalesMontly
}
export default UserService;
