import React, { useContext } from 'react';
import { Button, Navbar } from 'react-bootstrap';
import { Redirect, useHistory } from 'react-router-dom';
import TokenContext from '../context.js';

const Header = (props) => {
  const auth = useContext(TokenContext);
  const history = useHistory();
  const { from } = { from: { pathname: '/login' } };
  const redirectHandler = () => {
    return <Redirect to='/' />;
  };

  const signoutHandler = () => {
    auth.signout(() => {
      history.replace(from);
    });
  };
  return (
    <header>
      <Navbar className='bg-light justify-content-between'>
        <Navbar.Brand onClick={redirectHandler}>Hexlet Chat</Navbar.Brand>
        {auth.user && (
          <Button onClick={signoutHandler} variant='outline-primary'>
            Выйти
          </Button>
        )}
      </Navbar>
    </header>
  );
};

export default Header;
