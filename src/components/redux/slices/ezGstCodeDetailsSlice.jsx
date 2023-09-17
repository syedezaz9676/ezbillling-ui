import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import UserService from "../../../services/ezuser.service";
import { setMessage } from "../message"; 

export const doGetGstCodeDetails = createAsyncThunk(
    "getGstCodeDetails",
    async (thunkAPI) => {
      try {
        const GstCodeDetails = await UserService.getGstCodeDetails();
        return { GstCodeDetails };
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
const ezGstCodeDetailsSlice = createSlice({
    name:"getGstCodeDetails",
    initialState:{
    GstCodeDetails:[],
    isFetchGstCodeDetailsPending : false
    },
    extraReducers: (builder) => {
        builder.addCase(doGetGstCodeDetails.pending, (state, action)=>{
          // state.isLoading = true;
          state.isFetchGstCodeDetailsPending = true;
        });
        builder.addCase(doGetGstCodeDetails.fulfilled, (state, action)=>{
            // state.isLoading = false;
            state.GstCodeDetails = action.payload.GstCodeDetails.data;
            state.isFetchGstCodeDetailsPending = false;
        });
        builder.addCase(doGetGstCodeDetails.rejected, (state, action)=>{
            console.log('Error',action.payload);
            state.isError = true;
            state.isFetchGstCodeDetailsPending = false;
        })
    }
});

export default ezGstCodeDetailsSlice.reducer;