import { createSlice } from "@reduxjs/toolkit";

 const ezEnableFieldSlice = createSlice({
    name: 'enablefield',
    initialState:{
        isenable:false,
        isEdit:false,
        isshowBill:false
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
      },
      resetInvoiceNo: (state, action) => {
        state.ezInvoiceDetails.InvoiceNo = {};
        // Reset other state properties as needed
      },
      showBill: (state, action) => {
        console.log("in sf",action)
        state.isshowBill = true;
        // Reset other state properties as needed
      },
      hideBill: (state, action) => {
        state.isshowBill = false;
        // Reset other state properties as needed
      },
    },
  });

export const {ezhideField,ezshowField,showEdit,hideEdit,resetInvoiceNo,showBill,hideBill}  = ezEnableFieldSlice.actions;

export default ezEnableFieldSlice.reducer;