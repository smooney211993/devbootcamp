import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, loading } = useSelector(
    (state) => state.userLoginRegister
  );
  return (
    <Route
      {...Rest}
      render={(props) =>
        !isAuthenticated && !loading ? (
          <Redirect to='/' />
        ) : (
          <Component {...props} />
        )
      }></Route>
  );
};

export default PrivateRoute;
