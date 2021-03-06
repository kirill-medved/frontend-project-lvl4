import React from 'react';
import { Button, Navbar, Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useAuth } from '../../../hooks';

const Header = () => {
  const auth = useAuth();

  const [t] = useTranslation();

  const history = useHistory();
  const { from } = { from: { pathname: '/login' } };

  const signoutHandler = () => {
    auth.signout(() => {
      history.replace(from);
    });
  };

  const onClick = () => {
    signoutHandler();
  };

  return (
    <header>
      <Navbar className='bg-light justify-content-between'>
        <Container>
          <Navbar.Brand href='/'>{t('header.textLogo')}</Navbar.Brand>
          {auth.user && (
            <Button onClick={onClick} variant='outline-primary'>
              {t('header.button.signout')}
            </Button>
          )}
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
