import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import UserService from "../../../../services/ezuser.service";
import { setMessage } from "../../message";

export const saveBillingDetails = createAsyncThunk(
  "saveBillingDetails",
  async ({ BillingDetails }, thunkAPI) => {
    try {
      const savedBillDetails = await UserService.saveBillDetails(BillingDetails);
      return { savedBillDetails };
    } catch (error) {
      console.log('eror',error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);
export const getInvoiceDetails = createAsyncThunk(
  "getInvoiceDetails",
  async ({ InvoiceNo }, thunkAPI) => {
    try {
      const InvoiceDetailsByInvoiceNo = await UserService.getInvoiceDetails(InvoiceNo);
      return { InvoiceDetailsByInvoiceNo };
    } catch (error) {
      console.log('eror',error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);
export const getBillDetails = createAsyncThunk(
  "getBillDetails",
  async ({ InvoiceNo }, thunkAPI) => {
    try {
      const BillDetailsByInvoiceNo = await UserService.getBillDetails(InvoiceNo);
      return { BillDetailsByInvoiceNo };
    } catch (error) {
      console.log('eror',error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const updateBillingDetails = createAsyncThunk(
  "updateBillingDetails",
  async ({ BillingDetails }, thunkAPI) => {
    try {
      const updateBillDetails = await UserService.updateBillDetails(BillingDetails);
      return { updateBillDetails };
    } catch (error) {
      console.log('eror',error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const getGstDetailsOfCustomer = createAsyncThunk(
  "getGstDetailsOfCustomer",
  async ({ dates }, thunkAPI) => {
    try {
      const GstDetailsOfCustomer = await UserService.getGstDetailsOfCustomer(dates);
      return { GstDetailsOfCustomer };
    } catch (error) {
      console.log('eror',error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const getGstDetailsForHsnCode = createAsyncThunk(
  "getGstDetailsForHsnCode",
  async ({ dates }, thunkAPI) => {
    try {
      const GstDetailsforHsnCode = await UserService.getGstDetailsForHsnCode(dates);
      return { GstDetailsforHsnCode };
    } catch (error) {
      console.log('eror',error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);



export const getStockDetailsById = createAsyncThunk(
  "getStockDetailsById",
  async ({ id }, thunkAPI) => {
    try {
      console.log("id", id)
      const StockDetailsById = await UserService.getStockDetailsByID(id);
      return { StockDetailsById };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const saveStockDetails = createAsyncThunk(
  "saveStockDetails",
  async ({ StockDetails }, thunkAPI) => {
    try {
      const savedBillDetails = await UserService.saveStockDetails(StockDetails);
      return { savedBillDetails };
    } catch (error) {
      console.log('eror',error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const getStockDetailsByDgst = createAsyncThunk(
  "getStockDetailsByDgstAndPcom",
  async ({dgst}, thunkAPI) => {
    try {
      console.log("dgst,comp ", dgst)
      const StockDetailsByDgstAndPCom = await UserService.getStockDetailsByDgst(dgst);
      return { StockDetailsByDgstAndPCom };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const getSalesDetails = createAsyncThunk(
  "getSalesDetails",
  async ({ dates }, thunkAPI) => {
    try {
      const SalesDetails = await UserService.getSalesDetails(dates);
      return { SalesDetails };
    } catch (error) {
      console.log('eror',error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const saveUser = createAsyncThunk(
  "saveUser",
  async ({ user }, thunkAPI) => {
    try {
      const savedUserStatus = await UserService.saveUser(user);
      return { savedUserStatus };
    } catch (error) {
      console.log('eror',error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const getUsers = createAsyncThunk(
  "getUsers",
  async (thunkAPI) => {
    try {
      const Users = await UserService.getUsers();
      return { Users };
    } catch (error) {
      console.log('eror',error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const getUser = createAsyncThunk(
  "getUser",
  async ({ userName }, thunkAPI) => {
    try {
      const User = await UserService.getUser(userName);
      return { User };
    } catch (error) {
      console.log('eror',error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const getBillsDetails = createAsyncThunk(
  "getBillsDetails",
  async ({ userID },thunkAPI) => {
    try {
      const BillsAmountDetails = await UserService.getBillsDetails(userID);
      return { BillsAmountDetails };
    } catch (error) {
      console.log('eror',error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const getBalanceDetailsByDgst = createAsyncThunk(
  "getBalanceDetailsByDgst",
  async ({ userID },thunkAPI) => {
    try {
      const BalanceDetailsByDgst = await UserService.getBalanceDetailsByDgst(userID);
      return { BalanceDetailsByDgst };
    } catch (error) {
      console.log('eror',error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);
export const modifyBalanceDetails = createAsyncThunk(
  "modifyBalanceDetails",
  async ({ BalanceDetails }, thunkAPI) => {
    try {
      const ModifyBalanceDetailsStatus = await UserService.modifyBalanceDetails(BalanceDetails);
      return { ModifyBalanceDetailsStatus };
    } catch (error) {
      console.log('eror',error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);
export const getBalanceDetailsById = createAsyncThunk(
  "getBalanceDetailsById",
  async ({ id },thunkAPI) => {
    try {
      const BalanceDetailsById = await UserService.getBalanceDetailsById(id);
      return { BalanceDetailsById };
    } catch (error) {
      console.log('eror',error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const getGstSalesOfGstCustomers = createAsyncThunk(
  "getGstSalesOfGstCustomers",
  async ({ dates }, thunkAPI) => {
    try {
      const GstSalesOfGstCustomer = await UserService.getGstSalesOfGstCustomers(dates);
      return { GstSalesOfGstCustomer };
    } catch (error) {
      console.log('eror',error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const getGstSalesOfCustomers = createAsyncThunk(
  "getGstSalesOfCustomers",
  async ({ dates }, thunkAPI) => {
    try {
      const GstSalesOfCustomer = await UserService.getGstSalesOfCustomers(dates);
      return { GstSalesOfCustomer };
    } catch (error) {
      console.log('eror',error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const getBillsByDate = createAsyncThunk(
  "getBillsByDate",
  async ({ details }, thunkAPI) => {
    try {
      const BillsByDate = await UserService.getBillsByDate(details);
      return { BillsByDate };
    } catch (error) {
      console.log('eror',error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);
export const getMontlySales = createAsyncThunk(
  "getMontlySales",
  async ( thunkAPI) => {
    try {
      const Montlysales = await UserService.getMontlySales();
      return { Montlysales };
    } catch (error) {
      console.log('eror',error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);
export const getMonthlyCompanySales = createAsyncThunk(
  "getMonthlyCompanySales",
  async ({ details }, thunkAPI) => {
    try {
      const MonthlyCompanySales = await UserService.getMonthlyCompanySales(details);
      return { MonthlyCompanySales };
    } catch (error) {
      console.log('eror',error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const getProductSales = createAsyncThunk(
  "getProductSales",
  async ({ details }, thunkAPI) => {
    try {
      const productSaleQty = await UserService.getProductSales(details);
      return { productSaleQty };
    } catch (error) {
      console.log('eror',error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
)

export const getProductSalesMonthly = createAsyncThunk(
  "getProductSalesMonthly",
  async ({ details }, thunkAPI) => {
    try {
      const productSaleQtyMonthly = await UserService.getProductSalesMontly(details);
      return { productSaleQtyMonthly };
    } catch (error) {
      console.log('eror',error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
)

export const saveOrderDetails = createAsyncThunk(
  "saveOrderDetails",
  async ({ OrderDetails }, thunkAPI) => {
    try {
      const OrderDetailsSaveStatus = await UserService.saveOrderDetails(OrderDetails);
      return { OrderDetailsSaveStatus };
    } catch (error) {
      console.log('eror',error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
)
export const hideGstDetailsOfCustomer = createAsyncThunk(
  "hideGstDetailsOfCustomer",
 
);

export const hideGstDetailsForHsnCode = createAsyncThunk(
  "hideGstDetailsForHsnCode",
 
);

export const hideInvoiceDetails = createAsyncThunk(
  "hideInvoiceDetails",
 
)

export const hideSalesDetails = createAsyncThunk(
  "hideSalesDetails",
 
)

export const resetMonthlySales = createAsyncThunk(
  "resetMonthlySales",
 
)


// export const hideGstDetailsOfCustomer = () => {
//   return {
//     type: "hideGstDetailsOfCustomer", // Provide a unique action type
//   };
// };
const ezBillingDetailsSlice = createSlice({
  name: "billingDetails",
  initialState: {
    productDetails: [],
    StockDetailsByDgstAndPCom:[],
    isSaveBillingDetailsPending: false,
    isenable: false,
    isgetInvoiceDetailsSucess:false,
    GstDetailsOfCustomer:null,
    GstDetailsforHsncode:null,
    Users:[],
    InvoiceItems:{},
    BillsAmountDetails:[],
    BalanceDetailsByDgst:[],
    BalanceDetailsById:{},
    GstSalesOfGstCustomer:[],
    GstSalesOfCustomer:[],
    BillsByDate:[],
    Montlysales:[],
    MonthlyCompanySales:[]

  },
  extraReducers: (builder) => {
    builder.addCase(saveBillingDetails.pending, (state, action) => {
      // state.isLoading = true;
      state.isSaveBillingDetailsPending = true;
    });
    builder.addCase(saveBillingDetails.fulfilled, (state, action) => {
      // state.isLoading = false;
      state.InvoiceNo = action.payload.savedBillDetails.data;
      state.isSaveBillingDetailsPending = false;
    });
    builder.addCase(saveBillingDetails.rejected, (state, action) => {
      console.log('Error', action.payload);
      state.isError = true;
      state.isSaveBillingDetailsPending = false;
    });
    builder.addCase(getInvoiceDetails.pending, (state, action) => {
      // state.isLoading = true;
      state.isgetInvoiceDetailsPending = true;
    });
    builder.addCase(getInvoiceDetails.fulfilled, (state, action) => {
      // state.isLoading = false;
      state.InvoiceItems = action.payload.InvoiceDetailsByInvoiceNo.data;
      state.isgetInvoiceDetailsPending = false;
      state.isgetInvoiceDetailsSucess= true;
    });
    builder.addCase(getInvoiceDetails.rejected, (state, action) => {
      console.log('Error', action.payload);
      state.isError = true;
      state.isgetInvoiceDetailsPending = false;
    });
    builder.addCase(getBillDetails.pending, (state, action) => {
      // state.isLoading = true;
      state.isgetBillDetailsPending = true;
    });
    builder.addCase(getBillDetails.fulfilled, (state, action) => {
      // state.isLoading = false;
      state.billDetails = action.payload.BillDetailsByInvoiceNo.data;
      state.isgetBillDetailsPending = false;
      state.isgetBillDetailsSucess= true;
    });
    builder.addCase(getBillDetails.rejected, (state, action) => {
      console.log('Error', action.payload);
      state.isError = true;
      state.isgetBillDetailsPending = false;
    });
    builder.addCase(updateBillingDetails.pending, (state, action) => {
      // state.isLoading = true;
      state.isUpdateBillingDetailsPending = true;
    });
    builder.addCase(updateBillingDetails.fulfilled, (state, action) => {
      // state.isLoading = false;
      state.InvoiceNo = action.payload.updateBillDetails.data;
      state.isUpdateBillingDetailsPending = false;
    });
    builder.addCase(updateBillingDetails.rejected, (state, action) => {
      console.log('Error', action.payload);
      state.isError = true;
      state.isUpdateBillingDetailsPending = false;
    });
    builder.addCase(getGstDetailsOfCustomer.pending, (state, action) => {
      // state.isLoading = true;
      state.isGstDetailsOfCustomerPending = true;
    });
    builder.addCase(getGstDetailsOfCustomer.fulfilled, (state, action) => {
      // state.isLoading = false;
      state.GstDetailsOfCustomer = action.payload.GstDetailsOfCustomer.data;
      state.isGstDetailsOfCustomerPending = false;
    });
    builder.addCase(getGstDetailsOfCustomer.rejected, (state, action) => {
      console.log('Error', action.payload);
      state.isError = true;
      state.isGstDetailsOfCustomerPending = false;
    });
    builder.addCase(getGstDetailsForHsnCode.pending, (state, action) => {
      // state.isLoading = true;
      state.isGstDetailsForHsncodePending = true;
    });
    builder.addCase(getGstDetailsForHsnCode.fulfilled, (state, action) => {
      // state.isLoading = false;
      state.GstDetailsforHsnCode = action.payload.GstDetailsforHsnCode.data;
      state.isGstDetailsForHsncodePending = false;
    });
    builder.addCase(getGstDetailsForHsnCode.rejected, (state, action) => {
      console.log('Error', action.payload);
      state.isError = true;
      state.isGstDetailsForHsncodePending = false;
    });
    builder.addCase(getStockDetailsById.pending, (state, action) => {
      // state.isLoading = true;
      state.isStockDetailsByIdPending = true;
    });
    builder.addCase(getStockDetailsById.fulfilled, (state, action) => {
      // state.isLoading = false;
      state.StockDetailsById = action.payload.StockDetailsById.data;
      state.isStockDetailsByIdPending = false;
    });
    builder.addCase(getStockDetailsById.rejected, (state, action) => {
      console.log('Error', action.payload);
      state.isError = true;
      state.isStockDetailsByIdPending = false;
    });
    builder.addCase(modifyBalanceDetails.pending, (state, action) => {
      // state.isLoading = true;
      state.isModifyBalanceDetailsPending = true;
    });
    builder.addCase(modifyBalanceDetails.fulfilled, (state, action) => {
      // state.isLoading = false;
      state.ModifyBalanceDetailsStatus = action.payload.ModifyBalanceDetailsStatus.data;
      state.isModifyBalanceDetailsPending = false;
    });
    builder.addCase(modifyBalanceDetails.rejected, (state, action) => {
      console.log('Error', action.payload);
      state.isError = true;
      state.isModifyBalanceDetailsPending = false;
    });
    builder.addCase(saveStockDetails.pending, (state, action) => {
      // state.isLoading = true;
      state.isSaveStockDetailsPending = true;
    });
    builder.addCase(saveStockDetails.fulfilled, (state, action) => {
      // state.isLoading = false;
      state.saveStockDetailsStatus = action.payload.saveStockDetailsStatus.data;
      state.isSaveStockDetailsPending = false;
    });
    builder.addCase(saveStockDetails.rejected, (state, action) => {
      console.log('Error', action.payload);
      state.isError = true;
      state.isSaveStockDetailsPending = false;
    });
    builder.addCase(getStockDetailsByDgst.pending, (state, action) => {
      // state.isLoading = true;
      state.isgetStockDetailsByDgstAndPcomPending = true;
    });
    builder.addCase(getStockDetailsByDgst.fulfilled, (state, action) => {
      // state.isLoading = false;
      state.StockDetailsByDgstAndPCom = action.payload.StockDetailsByDgstAndPCom.data;
      state.isgetStockDetailsByDgstAndPcomPending = false;
    });
    builder.addCase(getStockDetailsByDgst.rejected, (state, action) => {
      console.log('Error', action.payload);
      state.isError = true;
      state.isgetStockDetailsByDgstAndPcomPending = false;
    });
    builder.addCase(getSalesDetails.pending, (state, action) => {
      // state.isLoading = true;
      state.isgetSalesDetailsPending = true;
    });
    builder.addCase(getSalesDetails.fulfilled, (state, action) => {
      // state.isLoading = false;
      state.SalesDetails = action.payload.SalesDetails.data;
      state.isgetSalesDetailsPending = false;
    });
    builder.addCase(getSalesDetails.rejected, (state, action) => {
      console.log('Error', action.payload);
      state.isError = true;
      state.isgetSalesDetailsPending = false;
    });
    builder.addCase(saveUser.pending, (state, action) => {
      // state.isLoading = true;
      state.isSaveUserPending = true;
    });
    builder.addCase(saveUser.fulfilled, (state, action) => {
      // state.isLoading = false;
      state.savedUserStatus = action.payload.savedUserStatus.data;
      state.isSaveUserPending = false;
    });
    builder.addCase(saveUser.rejected, (state, action) => {
      console.log('Error', action.payload);
      state.isError = true;
      state.isSaveUserPending = false;
    });
    builder.addCase(getUsers.pending, (state, action) => {
      // state.isLoading = true;
      state.isUsersrPending = true;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      // state.isLoading = false;
      state.Users = action.payload.Users.data;
      state.isUsersPending = false;
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      console.log('Error', action.payload);
      state.isError = true;
      state.isUsersPending = false;
    });
    builder.addCase(getUser.pending, (state, action) => {
      // state.isLoading = true;
      state.isUserPending = true;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      // state.isLoading = false;
      state.User = action.payload.User.data;
      state.isUserPending = false;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      console.log('Error', action.payload);
      state.isError = true;
      state.isUserPending = false;
    });
    builder.addCase(getBillsDetails.pending, (state, action) => {
      // state.isLoading = true;
      state.isBillsAmountDetailsPending = true;
    });
    builder.addCase(getBillsDetails.fulfilled, (state, action) => {
      // state.isLoading = false;
      state.BillsAmountDetails = action.payload.BillsAmountDetails.data;
      state.isBillsAmountDetailsPending = false;
    });
    builder.addCase(getBillsDetails.rejected, (state, action) => {
      console.log('Error', action.payload);
      state.isError = true;
      state.isBillsAmountDetailsPending = false;
    });
    builder.addCase(getBalanceDetailsByDgst.pending, (state, action) => {
      // state.isLoading = true;
      state.isBalanceDetailsByDgstPending = true;
    });
    builder.addCase(getBalanceDetailsByDgst.fulfilled, (state, action) => {
      // state.isLoading = false;
      state.BalanceDetailsByDgst = action.payload.BalanceDetailsByDgst.data;
      state.isBalanceDetailsByDgstPending = false;
    });
    builder.addCase(getBalanceDetailsByDgst.rejected, (state, action) => {
      console.log('Error', action.payload);
      state.isError = true;
      state.isBalanceDetailsByDgstPending = false;
    });
    builder.addCase(getMontlySales.pending, (state, action) => {
      // state.isLoading = true;
      state.isgetMontlySalesPending = true;
    });
    builder.addCase(getMontlySales.fulfilled, (state, action) => {
      // state.isLoading = false;
      state.Montlysales = action.payload.Montlysales.data;
      state.isgetMontlySalesPending = false;
      state.isgetMontlySalesSucess = true;
    });
    
    builder.addCase(getMontlySales.rejected, (state, action) => {
      console.log('Error', action.payload);
      state.isError = true;
      state.isgetMontlySalesPending = false;
    });
    builder.addCase(getBalanceDetailsById.pending, (state, action) => {
      // state.isLoading = true;
      state.isBalanceDetailsByIdPending = true;
    });
    builder.addCase(getBalanceDetailsById.fulfilled, (state, action) => {
      // state.isLoading = false;
      state.BalanceDetailsById = action.payload.BalanceDetailsById.data;
      state.isBalanceDetailsByIdPending = false;
      state.isBalanceDetailsByIdSucess = true;
    });
    builder.addCase(getBalanceDetailsById.rejected, (state, action) => {
      console.log('Error', action.payload);
      state.isError = true;
      state.isBalanceDetailsByIdPending = false;
    });
    builder.addCase(getGstSalesOfGstCustomers.pending, (state, action) => {
      // state.isLoading = true;
      state.isgetGstSalesOfGstCustomersPending = true;
    });
    builder.addCase(getGstSalesOfGstCustomers.fulfilled, (state, action) => {
      // state.isLoading = false;
      state.GstSalesOfGstCustomer = action.payload.GstSalesOfGstCustomer.data;
      state.isgetGstSalesOfGstCustomersPending = false;
      state.isgetGstSalesOfGstCustomersSucess = true;
    });
    
    builder.addCase(getGstSalesOfGstCustomers.rejected, (state, action) => {
      console.log('Error', action.payload);
      state.isError = true;
      state.isgetGstSalesOfGstCustomersPending = false;
    });
    builder.addCase(getGstSalesOfCustomers.pending, (state, action) => {
      // state.isLoading = true;
      state.isgetGstSalesOfCustomersPending = true;
    });
    builder.addCase(getGstSalesOfCustomers.fulfilled, (state, action) => {
      // state.isLoading = false;
      state.GstSalesOfCustomer = action.payload.GstSalesOfCustomer.data;
      state.isgetGstSalesOfCustomersPending = false;
      state.isgetGstSalesOfCustomersSucess = true;
    });
    
    builder.addCase(getGstSalesOfCustomers.rejected, (state, action) => {
      console.log('Error', action.payload);
      state.isError = true;
      state.isgetGstSalesOfCustomersPending = false;
    });
    builder.addCase(getBillsByDate.pending, (state, action) => {
      // state.isLoading = true;
      state.isgetBilllsByDatePending = true;
    });
    builder.addCase(getBillsByDate.fulfilled, (state, action) => {
      // state.isLoading = false;
      state.BillsByDate = action.payload.BillsByDate.data;
      state.isgetBilllsByDatePending = false;
      state.isgetBilllsBDateSucess = true;
    });
    
    builder.addCase(getBillsByDate.rejected, (state, action) => {
      console.log('Error', action.payload);
      state.isError = true;
      state.isgetBilllsByDatePending = false;
    });
    builder.addCase(getMonthlyCompanySales.pending, (state, action) => {
      // state.isLoading = true;
      state.isgetMonthlyCompanySalesPending = true;
    });
    builder.addCase(getMonthlyCompanySales.fulfilled, (state, action) => {
      // state.isLoading = false;
      state.MonthlyCompanySales = action.payload.MonthlyCompanySales.data;
      state.isgetMonthlyCompanySalesPending = false;
      state.isgetMonthlyCompanySalesSucess = true;
    });
    
    builder.addCase(getMonthlyCompanySales.rejected, (state, action) => {
      console.log('Error', action.payload);
      state.isError = true;
      state.isgetMonthlyCompanySalesPending = false;
    });
    builder.addCase(getProductSales.pending, (state, action) => {
      // state.isLoading = true;
      state.isgetProductSaleQtyPending = true;
    });
    builder.addCase(getProductSales.fulfilled, (state, action) => {
      // state.isLoading = false;
      state.productSaleQty = action.payload.productSaleQty.data;
      state.isgetProductSaleQtyPending = false;
      state.isgetProductSaleQtySucess = true;
    });
    
    builder.addCase(getProductSales.rejected, (state, action) => {
      console.log('Error', action.payload);
      state.isError = true;
      state.isgetMonthlyCompanySalesPending = false;
    });

    builder.addCase(getProductSalesMonthly.pending, (state, action) => {
      // state.isLoading = true;
      state.isgetProductSaleQtyMonthlyPending = true;
    });
    builder.addCase(getProductSalesMonthly.fulfilled, (state, action) => {
      // state.isLoading = false;
      state.productSaleQtyMonthly = action.payload.productSaleQtyMonthly.data;
      state.isgetProductSaleQtyMonthlyPending = false;
      state.isgetProductSaleQtyMonthlySucess = true;
    });

    builder.addCase(saveOrderDetails.rejected, (state, action) => {
      console.log('Error', action.payload);
      state.isError = true;
      state.issaveOrderDetailsPending = false;
    });

    builder.addCase(saveOrderDetails.pending, (state, action) => {
      // state.isLoading = true;
      state.issaveOrderDetailsPending = true;
    });
    builder.addCase(saveOrderDetails.fulfilled, (state, action) => {
      // state.isLoading = false;
      state.OrderDetails = action.payload.OrderDetails.data;
      state.issaveOrderDetailsPending = false;
      state.issaveOrderDetailsSuccess = true;
    });
    
    builder.addCase(getProductSalesMonthly.rejected, (state, action) => {
      console.log('Error', action.payload);
      state.isError = true;
      state.isgetProductSaleQtyMonthlyPending = false;
    });
    builder.addCase(hideGstDetailsOfCustomer.pending, (state) => {
      console.log("in null")
      state.GstDetailsOfCustomer = null;
    });
    builder.addCase(hideGstDetailsForHsnCode.pending, (state) => {
      console.log("in null")
      state.GstDetailsforHsnCode = null;
    });
    builder.addCase(hideInvoiceDetails.pending, (state) => {
      state.InvoiceItems = null;
      state.isgetInvoiceDetailsSucess=false;
    });
    builder.addCase(hideSalesDetails.pending, (state) => {
      state.SalesDetails = null;
      state.GstSalesOfGstCustomer = null;
      state.GstSalesOfCustomer = null;
      state.MonthlyCompanySales=null;
      state.productSaleQty=null;
      state.productSaleQtyMonthly=null;
      state.isgetProductSaleQtyMonthlySucess=false;
    });
    builder.addCase(resetMonthlySales.pending, (state) => {
      state.Montlysales = null;
      state.MonthlyCompanySales=null;
      
    });
  }
});

export default ezBillingDetailsSlice.reducer;