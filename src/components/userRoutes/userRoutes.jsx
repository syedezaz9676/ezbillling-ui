import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isLoggedin } from '../auth';

const userRoutes=()=> {
    console.log(isLoggedin);
    return isLoggedin() ? <Outlet/> : <Navigate to ={"/login"}/>
}

export default userRoutes;