import React, { useContext } from 'react';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import Header from './Components/Header.js';

import Login from './Components/Login.js';
import Main from './Components/Main/index.js';
import NotFound from './Components/NotFound.js';
import SignUp from './Components/SignUp.js';
import TokenContext from './context.js';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <PrivateRoute path='/' exact>
          <Main />
        </PrivateRoute>
        <Route path='/login' render={() => <Login />} />
        <Route path='/signup' render={() => <SignUp />} />
        <Route render={() => <NotFound />} />
      </Switch>
    </BrowserRouter>
  );
}

function PrivateRoute({ children, ...rest }) {
  const auth = useContext(TokenContext);
  return (
    <Route
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
