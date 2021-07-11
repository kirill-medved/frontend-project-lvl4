import React, { useState } from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import '../assets/application.scss';
import App from './App.js';
import TokenContext from './context.js';
import store from './store/store.js';

console.log('HIII');
if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

console.log('it works!');

const useProvideAuth = () => {
  const [user, setUser] = useState(localStorage.getItem('token'));
  console.log(user);
  const signin = (cb) => {
    setUser(localStorage.getItem('token'));
    cb();
  };

  const signout = (cb) => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUser(null);

    cb();
  };

  return {
    user,
    signin,
    signout,
  };
};

const Main = () => {
  const auth = useProvideAuth();
  return (
    <React.StrictMode>
      <Provider store={store}>
        <TokenContext.Provider value={auth}>
          <App />
        </TokenContext.Provider>
      </Provider>
    </React.StrictMode>
  );
};

ReactDOM.render(<Main />, document.getElementById('chat'));
