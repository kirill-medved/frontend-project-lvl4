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
      <Header />
      <Container>
        <Switch>
          <PrivateRoute path='/' exact>
            <Main />
          </PrivateRoute>
          <Route path='/login' render={() => <Login />} />
          <Route path='/signup' render={() => <SignUp />} />
          <Route render={() => <NotFound />} />
        </Switch>
      </Container>
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
