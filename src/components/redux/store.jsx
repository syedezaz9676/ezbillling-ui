import { configureStore } from "@reduxjs/toolkit";
import loginReducer from './loginSlice';
import ezLoginReducer from './ezLoginSlice';
import messageReducer from './message';
import ezGstCodeDetcailsReducer from "./slices/ezGstCodeDetailsSlice";
import ezCustomerRegistrationReducer from "./ezCustomerRegistrationSlice";
import ezCompanyDetailsReducer from "./slices/companydetails/ezCompanyDetailsSlice";

export const store = configureStore({
   reducer:{
      login: loginReducer,
      ezLogin: ezLoginReducer,
      message: messageReducer,
      ezgetGstCodeDetails:ezGstCodeDetcailsReducer,
      ezCustomerRegistration:ezCustomerRegistrationReducer,
      ezCompanyDetails:ezCompanyDetailsReducer

   }
});


