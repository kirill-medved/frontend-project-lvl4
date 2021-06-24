import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Login from './Components/Login.js';
import Main from './Components/Main.js';
import NotFound from './Components/NotFound.js';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact render={() => <Main />} />
        <Route path='/login' render={() => <Login />} />
        <Route render={() => <NotFound />} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
