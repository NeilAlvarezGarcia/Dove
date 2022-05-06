import React from 'react';
import {Navigate} from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Dashboard from '../google-drive/Dashboard';

const PrivateRoute = ({component : Component}) => {
  const {currentUser} = useAuth();

  return (
      currentUser ? <Dashboard/> : <Navigate to='/login'/>
  );
};

export default PrivateRoute;
