import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import UserService from "../../../../services/ezuser.service";
import { setMessage } from "../../message";

export const saveProductDetails = createAsyncThunk(
  "saveProductDetails",
  async ({ productDetails }, thunkAPI) => {
    try {
      const saveProductDetailsStatus = await UserService.saveProductDetails(productDetails);
      return { saveProductDetailsStatus };
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

export const getProductDetails = createAsyncThunk(
  "getProductDetails",
  async ({ userID }, thunkAPI) => {
    try {
      const productDetails = await UserService.getProductDetails(userID);
      return { productDetails };
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

export const getProductNames = createAsyncThunk(
  "getProductNames",
  async ({ userID }, thunkAPI) => {
    try {
      const productNames = await UserService.getProductNames(userID);
      return {  productNames  };
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

export const getProductDetailsByID = createAsyncThunk(
  "getProductDetailsByID",
  async ({ id }, thunkAPI) => {
    try {
      console.log("id", id)
      const productDetailsByID = await UserService.getProductDetailsByID(id);
      return { productDetailsByID };
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

export const getProductDetailsByCompany = createAsyncThunk(
  "getProductDetailsByCompany",
  async ({ cName }, thunkAPI) => {
    try {
      console.log("cName", cName)
      const productDetailsByCompany = await UserService.getProductDetailsByCompany(cName);
      return { productDetailsByCompany };
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

const ezProductDetailsSlice = createSlice({
  name: "productDetails",
  initialState: {
    productDetails: [],
    isSaveProductDetailsPending: false,
    isenable: false
  },
  extraReducers: (builder) => {
    builder.addCase(saveProductDetails.pending, (state, action) => {
      // state.isLoading = true;
      state.isSaveProductDetailsPending = true;
    });
    builder.addCase(saveProductDetails.fulfilled, (state, action) => {
      // state.isLoading = false;
      state.saveProductDetailsStatus = action.payload;
      state.isSaveProductDetailsPending = false;
    });
    builder.addCase(saveProductDetails.rejected, (state, action) => {
      console.log('Error', action.payload);
      state.isError = true;
      state.isSaveProductDetailsPending = false;
    });
    builder.addCase(getProductDetails.pending, (state, action) => {
      // state.isLoading = true;
      state.isgetProductDetailsPending = true;
    });
    builder.addCase(getProductDetails.fulfilled, (state, action) => {
      // state.isLoading = false;
      state.productDetails = action.payload.productDetails.data;
      state.isgetProductDetailsPending = false;
    });
    builder.addCase(getProductDetails.rejected, (state, action) => {
      console.log('Error', action.payload);
      state.isError = true;
      state.isgetProductDetailsPending = false;
    })
    builder.addCase(getProductNames.pending, (state, action) => {
      // state.isLoading = true;
      state.isgetProductNamesPending = true;
    });
    builder.addCase(getProductNames.fulfilled, (state, action) => {
      // state.isLoading = false;
      state.productNames = action.payload.productNames.data;
      state.isgetProductNamesPending = false;
    });
    builder.addCase(getProductNames.rejected, (state, action) => {
      console.log('Error', action.payload);
      state.isError = true;
      state.isgetProductNamesPending = false;
    })
    builder.addCase(getProductDetailsByID.pending, (state, action) => {
      // state.isLoading = true;
      state.isgetProductDetailsByIDPending = true;
    });
    builder.addCase(getProductDetailsByID.fulfilled, (state, action) => {
      // state.isLoading = false;
      state.productDetailsByID = action.payload.productDetailsByID.data;
      state.isgetProductDetailsByIDPending = false;
    });
    builder.addCase(getProductDetailsByID.rejected, (state, action) => {
      console.log('Error', action.payload);
      state.isError = true;
      state.isgetProductDetailsByIDPending = false;
    })
    builder.addCase(getProductDetailsByCompany.pending, (state, action) => {
      // state.isLoading = true;
      state.isgetProductDetailsByCompanyPending = true;
    });
    builder.addCase(getProductDetailsByCompany.fulfilled, (state, action) => {
      // state.isLoading = false;
      state.productDetailsByCompany = action.payload.productDetailsByCompany.data;
      state.isgetProductDetailsByCompanyPending = false;
    });
    builder.addCase(getProductDetailsByCompany.rejected, (state, action) => {
      console.log('Error', action.payload);
      state.isError = true;
      state.isgetProductDetailsByCompanyPending = false;
    })

  }
});

export default ezProductDetailsSlice.reducer;