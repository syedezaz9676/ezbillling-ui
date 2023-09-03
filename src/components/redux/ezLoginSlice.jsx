import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import authService from "../../services/auth.service";
import { setMessage } from "./message";

export const doEzLogin = createAsyncThunk(
    "ezLogin",
    async ({ username, password }, thunkAPI) => {
      try {
        const UserDetails = await authService.login(username, password);
        return { UserDetails };
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
const ezLoginSlice = createSlice({
    name:"ezLogin",
    initialState:{
    isLoading:false,
    data:null,
    isLoggedIn : false
    },
    extraReducers: (builder) => {
        builder.addCase(doEzLogin.pending, (state, action)=>{
          // state.isLoading = true;
          state.isLoggedIn = false;
        });
        builder.addCase(doEzLogin.fulfilled, (state, action)=>{
            // state.isLoading = false;
            state.isLoggedIn = true;
            state.UserDetails = action.payload.UserDetails.data;
        });
        builder.addCase(doEzLogin.rejected, (state, action)=>{
            console.log('Error',action.payload);
            state.isError = true;
            state.isLoggedIn = false;
        })
    }
});

export default ezLoginSlice.reducer;