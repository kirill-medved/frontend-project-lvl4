import React, { useContext } from 'react';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';
import { Container, Navbar } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames/bind.js';

import TokenContext from '../context.js';
import style from './Login.module.scss';

const validationSchema = yup.object({
  username: yup.string().required('Email is required'),
  password: yup
    .string()
    .min(4, 'Password should be of minimum 4 characters length')
    .required('Password is required'),
});

export default () => {
  const history = useHistory();
  const location = useLocation();
  const auth = useContext(TokenContext);

  const cx = classNames.bind(style);

  const [t] = useTranslation();

  const { from } = location.state || { from: { pathname: '/' } };
  const login = () => {
    auth.signin(() => {
      history.replace(from);
    });
  };

  const submitHandler = async (values, { setErrors }) => {
    // same shape as initial values
    try {
      const { data } = await axios.post('/api/v1/login', values);
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.username);
      login();
    } catch (error) {
      setErrors({ password: t('login.error') });
    }
  };
  return (
    <>
      <Formik
        initialValues={{
          username: '',
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={submitHandler}
      >
        {({ errors, touched }) => (
          <Form className={cx({ form__wrapper: true })}>
            <h1>{t('login.title')}</h1>
            <div className='form-group row'>
              <label htmlFor='username'>{t('login.username')}</label>
              <Field name='username' />
            </div>
            {/* If this field has been touched, and it contains an error, display it
             */}
            {touched.username && errors.username && (
              <div style={{ color: 'red' }}>{errors.username}</div>
            )}
            <div className='form-group row'>
              <label htmlFor='password'>{t('login.password')}</label>
              <Field name='password' />
            </div>
            {/* If this field has been touched, and it contains an error, display
           it */}
            {touched.password && errors.password && (
              <div style={{ color: 'red' }}>{errors.password}</div>
            )}
            <button className='btn btn-primary mb-2' type='submit'>
              Submit
            </button>
          </Form>
        )}
      </Formik>
      <Navbar>
        <Navbar.Collapse
          className={cx({
            redirect__wrapper: true,
            'card-footer': true,
            'justify-content-center': true,
          })}
        >
          <Navbar.Text>
            Нет аккаунта? <a href='/signup'>Регистрация</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};
