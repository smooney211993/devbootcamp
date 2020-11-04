import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Header from './Components/Layout/Header';
import Landing from './Components/Layout/Landing';
import Bootcamp from './Components/Bootcamps/Bootcamp';
import LoginScreen from './Components/Screens/LoginScreen';
import RegisterScreen from './Components/Screens/RegisterScreen';

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

          <Route path='/bootcamp/:id' component={Bootcamp} />
          <Route exact path='/login' component={LoginScreen} />
          <Route exact path='/register' component={RegisterScreen} />
        </Switch>
      </Container>
    </Router>
  );
};
export default App;
