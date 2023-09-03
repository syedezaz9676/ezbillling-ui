import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from "react-redux";

const UserRoutes=()=> {
    
    const { isLoggedIn } = useSelector((state) => state.ezLogin);
    console.log('isLoggedIn',isLoggedIn);
    return isLoggedIn ? <Outlet/> : <Navigate to ={"/login"}/>
}

export default UserRoutes;