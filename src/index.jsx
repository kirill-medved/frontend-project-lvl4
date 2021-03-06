import React, { useState } from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';

import '../assets/application.scss';
import App from './app';
import resources from './public/locales/index.js';
import { AuthContext } from './configs/contexts';
import store from './configs/store';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const useProvideAuth = () => {
  const [user, setUser] = useState(localStorage.getItem('token'));
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
        <AuthContext.Provider value={auth}>
          <I18nextProvider i18n={i18next}>
            <App />
          </I18nextProvider>
        </AuthContext.Provider>
      </Provider>
    </React.StrictMode>
  );
};

ReactDOM.render(<Main />, document.getElementById('chat'));
