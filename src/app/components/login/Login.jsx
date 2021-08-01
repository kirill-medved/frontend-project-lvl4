import React from 'react';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames/bind.js';

import style from './Login.module.scss';
import { useAuth } from '../../../hooks';
import { TextInput } from '../../../components';

const validationSchema = yup.object({
  username: yup.string().required('Email is required').default(''),
  password: yup
    .string()
    .min(4, 'Password should be of minimum 4 characters length')
    .required('Password is required')
    .default(''),
});

export default () => {
  const history = useHistory();
  const location = useLocation();
  const auth = useAuth();

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
    <div className='row h-100 bg-white flex-md-column'>
      <Formik
        initialValues={validationSchema.cast()}
        validationSchema={validationSchema}
        onSubmit={submitHandler}
      >
        {({ errors, touched }) => (
          <Form className={cx({ form__wrapper: true })}>
            <h1>{t('login.title')}</h1>

            <TextInput
              name='username'
              labelText={t('login.username')}
              placeholder='Username'
            />
            {touched.username && errors.username && (
              <div className={style.error__wrapper}>{errors.username}</div>
            )}

            <TextInput
              name='password'
              type='password'
              placeholder='Password'
              labelText={t('login.password')}
            />
            {touched.password && errors.password && (
              <div className={style.error__wrapper}>{errors.password}</div>
            )}
            <button
              className={cx({
                form__submit: true,
                btn: true,
                'btn-primary': true,
                'mb-2': true,
              })}
              type='submit'
            >
              Войти
            </button>
          </Form>
        )}
      </Formik>
      <Navbar
        className={cx({
          redirect__wrapper: true,
          'card-footer': true,
          'justify-content-center': true,
        })}
      >
        <Navbar.Collapse className='justify-content-center'>
          <Navbar.Text>
            Нет аккаунта? <a href='/signup'>Регистрация</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};
