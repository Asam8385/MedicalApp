import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getUserInfo } from '../../service/auth.service';

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const userInfo = getUserInfo();
console.log(userInfo)
const Role = localStorage.getItem('adminRole')
  return userInfo?.role === 'admin' ? children : 
  <Navigate to='/' state = {{from : location.pathname}} replace/>
};

export default PrivateRoute;