import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import UserService from "../../../../services/ezuser.service";
import { setMessage } from "../../message";

export const saveProductDetails = createAsyncThunk(
  "saveProductDetails",
  async ({ productDetails }, thunkAPI) => {
    try {
      const saveProductDetailsStatus = await UserService.saveProductDetails(
        productDetails
      );
      return { saveProductDetailsStatus };
    } catch (error) {
      console.log("eror", error);
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
      return { productNames };
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
      console.log("id", id);
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
      console.log("cName", cName);
      const productDetailsByCompany =
        await UserService.getProductDetailsByCompany(cName);
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
export const getHsncodes = createAsyncThunk("getHsncodes", async (thunkAPI) => {
  try {
    const hsnCodes = await UserService.gstHsncodeDetails();
    return { hsnCodes };
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue();
  }
});

export const saveHsnCodeDetails = createAsyncThunk(
  "saveHsnCodeDetails",
  async ({ HsnCodeDetails }, thunkAPI) => {
    try {
      console.log("HsnCodeDetails", HsnCodeDetails);
      const saveHsnCodeStatus = await UserService.saveHsnCodeDetails(
        HsnCodeDetails
      );
      return { saveHsnCodeStatus };
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

export const deActivateProduct = createAsyncThunk(
  "deActivateProduct",
  async ({ id }, thunkAPI) => {
    try {
      const deActivateProductStatus = await UserService.deActivateProduct(id);
      return { deActivateProductStatus };
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
    isenable: false,
    productNames: [],
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
      console.log("Error", action.payload);
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
      console.log("Error", action.payload);
      state.isError = true;
      state.isgetProductDetailsPending = false;
    });
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
      console.log("Error", action.payload);
      state.isError = true;
      state.isgetProductNamesPending = false;
    });
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
      console.log("Error", action.payload);
      state.isError = true;
      state.isgetProductDetailsByIDPending = false;
    });
    builder.addCase(getProductDetailsByCompany.pending, (state, action) => {
      // state.isLoading = true;
      state.isgetProductDetailsByCompanyPending = true;
    });
    builder.addCase(getProductDetailsByCompany.fulfilled, (state, action) => {
      // state.isLoading = false;
      state.productDetailsByCompany =
        action.payload.productDetailsByCompany.data;
      state.isgetProductDetailsByCompanyPending = false;
    });
    builder.addCase(getProductDetailsByCompany.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
      state.isgetProductDetailsByCompanyPending = false;
    });
    builder.addCase(getHsncodes.pending, (state, action) => {
      // state.isLoading = true;
      state.isgetHsnCodesPending = true;
    });
    builder.addCase(getHsncodes.fulfilled, (state, action) => {
      // state.isLoading = false;
      state.hsnCodes = action.payload.hsnCodes.data;
      state.isgetHsnCodesPending = false;
    });
    builder.addCase(getHsncodes.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
      state.isgetHsnCodesPending = false;
    });
    builder.addCase(saveHsnCodeDetails.pending, (state, action) => {
      // state.isLoading = true;
      state.issaveHsnCodesPending = true;
    });
    builder.addCase(saveHsnCodeDetails.fulfilled, (state, action) => {
      // state.isLoading = false;
      state.saveHsnCodeStatus = action.payload.saveHsnCodeStatus.data;
      state.issaveHsnCodesPending = false;
    });
    builder.addCase(saveHsnCodeDetails.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
      state.issaveHsnCodesPending = false;
    });
    builder.addCase(deActivateProduct.pending, (state, action) => {
      // state.isLoading = true;
      state.isDeActivateProductPending = true;
    });
    builder.addCase(deActivateProduct.fulfilled, (state, action) => {
      // state.isLoading = false;
      state.deActivateProductStatus = action.payload.deActivateProductStatus.data;
      state.isDeActivateProductPending = false;
    });
    builder.addCase(deActivateProduct.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
      state.isDeActivateProductPending = false;
    });
  },
});

export default ezProductDetailsSlice.reducer;
