import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateAdminRoute = ({ component: Component, ...rest }) => {
  const {
    loading,
    isAuthenticated,
    user: { role },
  } = useSelector((state) => state.userLoginRegister);
  return (
    <Route
      {...rest}
      render={(props) => {
        !isAuthenticated && loading && role !== 'admin' ? (
          <Redirect to='login' />
        ) : (
          <Component {...props} />
        );
      }}></Route>
  );
};

export default PrivateAdminRoute;
