import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';

// routing
import PrivateAdminRoute from './Components/Routes/PrivateAdminRoute';

// components
import Header from './Components/Layout/Header';
import Landing from './Components/Layout/Landing';
import Bootcamp from './Components/Bootcamps/Bootcamp';
import LoginScreen from './Components/Screens/LoginScreen';
import RegisterScreen from './Components/Screens/RegisterScreen';
import BootcampReviews from './Components/Reviews/BootcampReviews';

// admin screens
import AdminScreen from './Components/Screens/AdminScreen';
import BootcampListScreen from './Components/Screens/BootcampListScreen';
import BootcampEditScreen from './Components/Screens/BootcampEditScreen';

import { useDispatch } from 'react-redux';
import { loadUser } from './actions/userActions';
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  console.log(document.cookie);
  return (
    <Router>
      <Header />
      <Container>
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route
            exact
            path='/search/:keyword/averageCost/:averageCost/averageRating/:averageRating/page/:pageNumber'
            component={Landing}
          />
          <Route exact path='/' component={Landing} />
          <Route
            path='/search/:keyword/averageCost/:averageCost/averageRating/:averageRating'
            component={Landing}
          />
          <Route path='/page/:pageNumber' component={Landing} />
          <Route
            exact
            path='/averageCost/:averageCost/averageRating/:averageRating'
            component={Landing}
          />
          <Route
            exact
            path='/averageCost/:averageCost/averageRating/:averageRating/page/:pageNumber'
            component={Landing}
          />
          <Route path='/bootcamp/:id/reviews' component={BootcampReviews} />
          <Route path='/bootcamp/:id' component={Bootcamp} />

          <Route exact path='/login' component={LoginScreen} />
          <Route exact path='/register' component={RegisterScreen} />

          <PrivateAdminRoute
            exact
            path='/admin/bootcamps/search/:keyword/averageCost/:averageCost/averageRating/:averageRating/page/:pageNumber'
            component={BootcampListScreen}
          />
          <PrivateAdminRoute
            exact
            path='/admin/bootcamps/search/:keyword/averageCost/:averageCost/averageRating/:averageRating'
            component={BootcampListScreen}
          />
          <PrivateAdminRoute
            exact
            path='/admin/bootcamps/averageCost/:averageCost/averageRating/:averageRating/page/:pageNumber'
            component={BootcampListScreen}
          />
          <PrivateAdminRoute
            exact
            path='/admin/bootcamps/averageCost/:averageCost/averageRating/:averageRating'
            component={BootcampListScreen}
          />

          <PrivateAdminRoute
            exact
            path='/admin/bootcamps/page/:pageNumber'
            component={BootcampListScreen}
          />

          <PrivateAdminRoute
            path='/admin/bootcamps'
            component={BootcampListScreen}
          />
          <PrivateAdminRoute
            path='/admin/bootcamp/:bootcampId'
            component={BootcampEditScreen}
          />

          <PrivateAdminRoute path='/admin' component={AdminScreen} />
        </Switch>
      </Container>
    </Router>
  );
};
export default App;
