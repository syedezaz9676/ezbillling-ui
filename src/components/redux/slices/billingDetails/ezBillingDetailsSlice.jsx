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
    Users:[]
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
    });
    builder.addCase(hideSalesDetails.pending, (state) => {
      state.SalesDetails = null;
    });
  }
});

export default ezBillingDetailsSlice.reducer;