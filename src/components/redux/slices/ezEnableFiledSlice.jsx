import { createSlice } from "@reduxjs/toolkit";

 const ezEnableFieldSlice = createSlice({
    name: 'enablefield',
    initialState:{
        isenable:false,
        isEdit:false
      },
    reducers: {
      // Add your logout action here
      ezshowField: (state, action) => {
        console.log("in sf",action)
        state.isenable = true;
        // Reset other state properties as needed
      },
      ezhideField: (state, action) => {
        state.isenable = false;
        // Reset other state properties as needed
      },
      showEdit: (state, action) => {
        state.isEdit = true;
        // Reset other state properties as needed
      },
      hideEdit: (state, action) => {
        state.isEdit = false;
        // Reset other state properties as needed
      }
    },
  });

export const {ezhideField,ezshowField,showEdit,hideEdit}  = ezEnableFieldSlice.actions;

export default ezEnableFieldSlice.reducer;