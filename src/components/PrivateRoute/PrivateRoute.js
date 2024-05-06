import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getUserInfo } from '../../service/auth.service';

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const userInfo = getUserInfo();
console.log(userInfo)
  return userInfo.role === 'admin' && userInfo.userId ? children : 
  <Navigate to='/login' state = {{from : location.pathname}} replace/>
};

export default PrivateRoute;