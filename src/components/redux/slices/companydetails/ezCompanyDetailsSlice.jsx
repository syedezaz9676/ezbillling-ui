import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import UserService from "../../../../services/ezuser.service";
import { setMessage } from "../../message";

export const saveCompanyDetails = createAsyncThunk(
  "saveCompanyDetails",
  async ({ companyrDetails }, thunkAPI) => {
    try {
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
  async ({ userID },thunkAPI) => {
    try {
      const companyDetails = await UserService.getCompanyDetails(userID);
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
);

export const getCompanyNames = createAsyncThunk(
  "getCompanyNames",
  async ({ userID },thunkAPI) => {
    try {
      const companyNames = await UserService.getCompanyNames(userID);
      return { companyNames };
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

export const getCompanyDetailsByID = createAsyncThunk(
  "getCompanyDetailsByID",
  async ({ id }, thunkAPI) => {
    try {
      console.log("id", id)
      const companyDetailsByID = await UserService.getCompanyDetailsByID(id);
      return { companyDetailsByID };
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

export const deActivateCompany = createAsyncThunk(
  "deActivateCompany",
  async ({ id }, thunkAPI) => {
    try {
      const deActivateCompanyStatus = await UserService.deActivateCompany(id);
      return { deActivateCompanyStatus };
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

const editCompanyDetailsSlice = createSlice({
  name: 'editCompanyDetails',
  
  initialState:{
    isEdit:false

  },
  reducers: {
    clearCompanyDetailsByID: (state, action) => {
      state.companyDetailsByID = "";
      // Reset other state properties as needed
    },
    enableEdit: (state, action) => {
      state.isEdit = true;
      // Reset other state properties as needed
    },
    disableEdit: (state, action) => {
      state.isEdit = false;
      // Reset other state properties as needed
    }
  },
});
const ezCompanyDetailsSlice = createSlice({
  name: "companyDetails",
  initialState: {
    companyDeatils: [],
    isSaveCompanyDetailsPending: false
  },
  extraReducers: (builder) => {
    builder.addCase(saveCompanyDetails.pending, (state, action) => {
      // state.isLoading = true;
      state.isSaveCompanyDetailsPending = true;
    });
    builder.addCase(saveCompanyDetails.fulfilled, (state, action) => {
      // state.isLoading = false;
      state.saveCompanyDetailsStatus = action.payload.saveCompanyDetailsStatus.data;
      state.isSaveCompanyDetailsPending = false;
    });
    builder.addCase(saveCompanyDetails.rejected, (state, action) => {
      console.log('Error', action.payload);                        
      state.isError = true;
      state.isSaveCompanyDetailsPending = false;
    })
    builder.addCase(getCompanyDetails.pending, (state, action) => {
      // state.isLoading = true;
      state.isgetCompanyDetailsPending = true;
    });
    builder.addCase(getCompanyDetails.fulfilled, (state, action) => {
      // state.isLoading = false;
      state.companyDeatils = action.payload.companyDetails.data;
      state.isgetCompanyDetailsPending = false;
    });
    builder.addCase(getCompanyDetails.rejected, (state, action) => {
      console.log('Error', action.payload);
      state.isError = true;
      state.isgetCompanyDetailsPending = false;
    })
    builder.addCase(getCompanyNames.pending, (state, action) => {
      // state.isLoading = true;
      state.isgetCompanyNamesPending = true;
    });
    builder.addCase(getCompanyNames.fulfilled, (state, action) => {
      // state.isLoading = false;
      state.companyNames = action.payload.companyNames.data;
      state.isgetCompanyNamesPending = false;
    });
    builder.addCase(getCompanyNames.rejected, (state, action) => {
      console.log('Error', action.payload);
      state.isError = true;
      state.isgetCompanyNamesPending = false;
    })
    builder.addCase(getCompanyDetailsByID.pending, (state, action) => {
      // state.isLoading = true;
      state.isgetCompanyDetailsByIDPending = true;
    });
    builder.addCase(getCompanyDetailsByID.fulfilled, (state, action) => {
      // state.isLoading = false;
      state.companyDetailsByID = action.payload.companyDetailsByID.data;
      state.isgetCompanyDetailsByIDPending = false; 
    });
    builder.addCase(getCompanyDetailsByID.rejected, (state, action) => {
      console.log('Error', action.payload);
      state.isError = true;
      state.isgetCompanyDetailsByIDPending = false;
    })
    builder.addCase(deActivateCompany.pending, (state, action) => {
      // state.isLoading = true;
      state.isDeActivateCompanyPending = true;
    });
    builder.addCase(deActivateCompany.fulfilled, (state, action) => {
      // state.isLoading = false;
      state.deActivateCompanyStatus = action.payload.deActivateCompanyStatus.data;
      state.isDeActivateCompanyPending = false; 
    });
    builder.addCase(deActivateCompany.rejected, (state, action) => {
      console.log('Error', action.payload);
      state.isError = true;
      state.isDeActivateCompanyPending = false;
    })
  }
});

export const {clearCompanyDetailsByID,enableEdit,disableEdit}  = editCompanyDetailsSlice.actions;

export default ezCompanyDetailsSlice.reducer;