import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import authService from "../../services/auth.service";
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
const ezCustomerRegistrationSlice = createSlice({
    name:"ezCustomerRegistration",
    initialState:{
    data:null,
    isCustomerRegistrationDone : false
    },
    extraReducers: (builder) => {
        builder.addCase(doCustomerRegistration.pending, (state, action)=>{
          state.isCustomerRegistrationDone = false;
        });
        builder.addCase(doCustomerRegistration.fulfilled, (state, action)=>{
            state.isCustomerRegistrationDone = true;
            state.customerRegistrationStatus = action.payload.customerRegistrationStatus.data;
        });
        builder.addCase(doCustomerRegistration.rejected, (state, action)=>{
            console.log('Error',action.payload);
            state.isError = true;
    })
  }
});

export default ezCustomerRegistrationSlice.reducer;