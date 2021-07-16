import React, { useContext } from 'react';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Header from './Components/Header.jsx';
import Login from './Components/Login.jsx';
import Main from './Components/Main/index.js';
import NotFound from './Components/NotFound.jsx';
import SignUp from './Components/SignUp.jsx';
import TokenContext from './context.js';

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

function PrivateRoute({ children, ...rest }) {
  const auth = useContext(TokenContext);
  return (
    <Route
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default App;
