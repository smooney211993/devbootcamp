import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Header from './Components/Layout/Header';
import Landing from './Components/Layout/Landing';
import Bootcamp from './Components/Bootcamps/Bootcamp';
import LoginScreen from './Components/Screens/LoginScreen';

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
          <Route path='/search/:keyword/page/:pageNumber' component={Landing} />
          <Route path='/search/:keyword' component={Landing} />
          <Route path='/page/:pageNumber' component={Landing} />
          <Route path='/bootcamp/:id' component={Bootcamp} />
          <Route exact path='/login' component={LoginScreen} />
        </Switch>
      </Container>
    </Router>
  );
};
export default App;
