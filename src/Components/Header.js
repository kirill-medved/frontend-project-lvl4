import React, { useContext } from 'react';
import { Button, Navbar, Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import TokenContext from '../context.js';

const Header = (props) => {
  const auth = useContext(TokenContext);

  const [t, i18n] = useTranslation();

  const history = useHistory();
  const { from } = { from: { pathname: '/login' } };

  const signoutHandler = () => {
    auth.signout(() => {
      history.replace(from);
    });
  };

  return (
    <header>
      <Navbar className='bg-light justify-content-between'>
        <Container>
          <Navbar.Brand href='/'>{t('header.textLogo')}</Navbar.Brand>
          {auth.user && (
            <Button onClick={signoutHandler} variant='outline-primary'>
              {t('header.button.signout')}
            </Button>
          )}
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
