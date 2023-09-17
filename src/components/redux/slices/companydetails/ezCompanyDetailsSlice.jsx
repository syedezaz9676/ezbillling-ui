import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import UserService from "../../../../services/ezuser.service";
import { setMessage } from "../../message";

export const saveCompanyDetails = createAsyncThunk(
    "saveCompanyDetails",
    async ({companyrDetails},thunkAPI) => {
      try {
        console.log("in slice savecomp",companyrDetails)
        const saveCompanyDetailsStatus = await UserService.saveCompanyDetails(companyrDetails);
        return { saveCompanyDetailsStatus };
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

  export const getCompanyDetails = createAsyncThunk(
    "getCompanyDetails",
    async (thunkAPI) => {
      try {
        const companyDetails = await UserService.getCompanyDetails();
        return { companyDetails };
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
  );;
const ezCompanyDetailsSlice = createSlice({
    name:"companyDetails",
    initialState:{
    companyDeatils:[],
    isSaveCompanyDetailsPending : false
    },
    extraReducers: (builder) => {
        builder.addCase(saveCompanyDetails.pending, (state, action)=>{
          // state.isLoading = true;
          state.isSaveCompanyDetailsPending = true;
        });
        builder.addCase(saveCompanyDetails.fulfilled, (state, action)=>{
            // state.isLoading = false;
            state.saveCompanyDetailsStatus = action.payload.saveCompanyDetailsStatus.data;
            state.isSaveCompanyDetailsPending = false;
        });
        builder.addCase(saveCompanyDetails.rejected, (state, action)=>{
            console.log('Error',action.payload);
            state.isError = true;
            state.isSaveCompanyDetailsPending = false;
        })
        builder.addCase(getCompanyDetails.pending, (state, action)=>{
            // state.isLoading = true;
            state.isgetCompanyDetailsPending = true;
          });
          builder.addCase(getCompanyDetails.fulfilled, (state, action)=>{
              // state.isLoading = false;
              state.companyDeatils = action.payload.companyDetails.data;
              state.isgetCompanyDetailsPending = false;
          });
          builder.addCase(getCompanyDetails.rejected, (state, action)=>{
              console.log('Error',action.payload);
              state.isError = true;
              state.isgetCompanyDetailsPending = false;
          })
    }
});

export default ezCompanyDetailsSlice.reducer;