import React, { useContext } from 'react';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';

import Login from './Components/Login.js';
import Main from './Components/Main/index.js';
import NotFound from './Components/NotFound.js';
import SingUp from './Components/SingUp.js';
import TokenContext from './context.js';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute path='/' exact>
          <Main />
        </PrivateRoute>
        <Route path='/login' render={() => <Login />} />
        <Route path='/singup' render={() => <SingUp />} />
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
