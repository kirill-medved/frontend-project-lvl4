import React, { useContext } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import TokenContext from './context.js';
import {
  PrivateRoute,
  Header,
  Login,
  Main,
  NotFound,
  SignUp,
} from './components';

function App() {
  return (
    <BrowserRouter>
      <div className='d-flex flex-column h-100'>
        <Header />
        <Container className='h-100 my-4 overflow-hidden rounded shadow'>
          <Switch>
            <PrivateRoute path='/' exact>
              <Main />
            </PrivateRoute>
            <Route path='/login' render={() => <Login />} />
            <Route path='/signup' render={() => <SignUp />} />
            <Route render={() => <NotFound />} />
          </Switch>
        </Container>
      </div>
    </BrowserRouter>
  );
}

export default App;
