import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import authService from "../../services/auth.service";
import UserService from "../../services/ezuser.service";
import { setMessage } from "./message";

export const doCustomerRegistration = createAsyncThunk(
  "ezCustomerRegistration",
  async ({ customerDetails }, thunkAPI) => {
    try {
      const customerRegistrationStatus = await authService.customerRegistration(customerDetails);
      return { customerRegistrationStatus };
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

export const getCustomerNames = createAsyncThunk(
  "getCustomerNames",
  async ({ userID },thunkAPI) => {
    try {
      const customerNames = await UserService.getCustomerNames(userID);
      return { customerNames };
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

export const getCustomerDetailsByID = createAsyncThunk(
  "getCustomerDetailsByID",
  async ({ id }, thunkAPI) => {
    try {
      console.log("id", id)
      const customerDetailsByID = await UserService.getCustomerDetailsByID(id);
      return { customerDetailsByID };
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
)

export const getCustomerDetailsByDgst = createAsyncThunk(
  "getCustomerDetailsByDgst",
  async ({ id }, thunkAPI) => {
    try {
      console.log("id", id)
      const customerDetailsByDgst = await UserService.getCustomerDetailsByDgst(id);
      return { customerDetailsByDgst };
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
)
const ezCustomerRegistrationSlice = createSlice({
  name: "ezCustomerRegistration",
  initialState: {
    data: null,
    isCustomerRegistrationDone: false,
    customerDetailsByDgst:[]
  },
  extraReducers: (builder) => {
    builder.addCase(doCustomerRegistration.pending, (state, action) => {
      state.isCustomerRegistrationDone = false;
    });
    builder.addCase(doCustomerRegistration.fulfilled, (state, action) => {
      state.isCustomerRegistrationDone = true;
      state.customerRegistrationStatus = action.payload.customerRegistrationStatus.data;
    });
    builder.addCase(doCustomerRegistration.rejected, (state, action) => {
      console.log('Error', action.payload);
      state.isError = true;
    })
    builder.addCase(getCustomerNames.pending, (state, action) => {
      state.isgetCustomerNameDone = false;
    });
    builder.addCase(getCustomerNames.fulfilled, (state, action) => {
      state.isgetCustomerNameDone = true;
      state.customerNames = action.payload.customerNames.data;
    });
    builder.addCase(getCustomerNames.rejected, (state, action) => {
      console.log('Error', action.payload);
      state.isError = true;
    })
    builder.addCase(getCustomerDetailsByID.pending, (state, action) => {
      state.isgetCustomerDetailsByIDPendng = true;
    });
    builder.addCase(getCustomerDetailsByID.fulfilled, (state, action) => {
      state.isgetCustomerDetailsByIDPendng = false;
      state.customerDetailsByID = action.payload.customerDetailsByID.data;
    });
    builder.addCase(getCustomerDetailsByID.rejected, (state, action) => {
      console.log('Error', action.payload);
      state.isError = true;
    })
    builder.addCase(getCustomerDetailsByDgst.pending, (state, action) => {
      state.isgetCustomerDetailsByDgstPendng = true;
    });
    builder.addCase(getCustomerDetailsByDgst.fulfilled, (state, action) => {
      state.isgetCustomerDetailsByDgstPendng = false;
      state.customerDetailsByDgst = action.payload.customerDetailsByDgst.data
      ;
    });
    builder.addCase(getCustomerDetailsByDgst.rejected, (state, action) => {
      console.log('Error', action.payload);
      state.isError = true;
    })
  }
});

export default ezCustomerRegistrationSlice.reducer;