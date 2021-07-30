import React, { useState } from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';

import '../assets/application.scss';
import App from './app';
import TokenContext from './context.js';
import store from './store/store.js';
import resources from './public/locales/index.js';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

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

i18next.init({
  interpolation: { escapeValue: false }, // React already does escaping
  lng: 'ru',
  resources,
});

const Main = () => {
  const auth = useProvideAuth();
  return (
    <React.StrictMode>
      <Provider store={store}>
        <TokenContext.Provider value={auth}>
          <I18nextProvider i18n={i18next}>
            <App />
          </I18nextProvider>
        </TokenContext.Provider>
      </Provider>
    </React.StrictMode>
  );
};

ReactDOM.render(<Main />, document.getElementById('chat'));
