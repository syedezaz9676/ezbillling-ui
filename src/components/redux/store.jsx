import { configureStore } from "@reduxjs/toolkit";
import loginReducer from './loginSlice';
import ezLoginReducer from './ezLoginSlice';
import messageReducer from './message';

export const store = configureStore({
   reducer:{
      login: loginReducer,
      ezLogin: ezLoginReducer,
      message: messageReducer

   }
});


