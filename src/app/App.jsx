import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import {
  PrivateRoute,
  Header,
  Login,
  Main,
  NotFound,
  SignUp,
} from './components/index.js';
import { LOGIN_ROUTE, MAIN_ROUTE, SIGN_UP_ROUTE } from '../configs/index.js';

function App() {
  return (
    <BrowserRouter>
      <div className='d-flex flex-column h-100'>
        <Header />
        <Container className='h-100 my-4 overflow-hidden rounded shadow'>
          <Switch>
            <PrivateRoute path={MAIN_ROUTE} exact>
              <Main />
            </PrivateRoute>
            <Route path={LOGIN_ROUTE} render={() => <Login />} />
            <Route path={SIGN_UP_ROUTE} render={() => <SignUp />} />
            <Route render={() => <NotFound />} />
          </Switch>
        </Container>
      </div>
    </BrowserRouter>
  );
}

export default App;
