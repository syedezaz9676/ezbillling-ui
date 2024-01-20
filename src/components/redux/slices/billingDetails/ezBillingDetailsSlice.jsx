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
const ezBillingDetailsSlice = createSlice({
  name: "billingDetails",
  initialState: {
    productDetails: [],
    isSaveBillingDetailsPending: false,
    isenable: false
  },
  extraReducers: (builder) => {
    builder.addCase(saveBillingDetails.pending, (state, action) => {
      // state.isLoading = true;
      state.isSaveBillingDetailsPending = true;
    });
    builder.addCase(saveBillingDetails.fulfilled, (state, action) => {
      // state.isLoading = false;
      state.savedBilligDetails = action.payload;
      state.isSaveBillingDetailsPending = false;
    });
    builder.addCase(saveBillingDetails.rejected, (state, action) => {
      console.log('Error', action.payload);
      state.isError = true;
      state.isSaveBillingDetailsPending = false;
    });
  }
});

export default ezBillingDetailsSlice.reducer;