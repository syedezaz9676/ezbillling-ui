import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const doLogin = createAsyncThunk('doLogin', async ()=>{
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    return response.json();
})
const loginSlice = createSlice({
    name:"login",
    initialState:{
    isLoading:false,
    data:null
    },
    extraReducers: (builder) => {
        builder.addCase(doLogin.pending, (state, action)=>{
          state.isLoading = true;
        });
        builder.addCase(doLogin.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(doLogin.rejected, (state, action)=>{
            console.log('Error',action.payload);
            state.isError = true;
        })
    }
});

export default loginSlice.reducer;