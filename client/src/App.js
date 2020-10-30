import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Header from './Components/Layout/Header';
import Landing from './Components/Layout/Landing';
import Bootcamp from './Components/Bootcamps/Bootcamp';

const App = () => {
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
        </Switch>
      </Container>
    </Router>
  );
};
export default App;
