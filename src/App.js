import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route path='/' exact render={() => <Main />} />
        <Route path='/login' render={() => <Login />} />
        <Route render={() => <NotFound />} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;