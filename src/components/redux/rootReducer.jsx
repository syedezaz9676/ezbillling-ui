import { combineReducers } from "@reduxjs/toolkit";
import AuthReducder from "./AuthReducer";

const RootReducer= combineReducers (
    {
      AuthReducder
    }
)

export default RootReducer
