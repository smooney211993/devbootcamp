import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Header from './Components/Layout/Header';
import Landing from './Components/Layout/Landing';

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Switch>
          <Container>
            <Route exact path='/' component={Landing} />
          </Container>
        </Switch>
      </main>
    </Router>
  );
};
export default App;
