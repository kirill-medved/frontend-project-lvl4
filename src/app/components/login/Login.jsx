import React from 'react';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import classnames from 'classnames';

import style from './Login.module.scss';
import { useAuth } from '../../../hooks';
import { TextInput } from '../../../components';
import { endpoints } from '../../../configs';

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

  const [t] = useTranslation();

  const { from } = location.state || { from: { pathname: '/' } };
  const login = () => {
    auth.signin(() => {
      history.replace(from);
    });
  };

  const onSubmit = async (values, { setErrors }) => {
    // same shape as initial values
    try {
      const { data } = await axios.post(endpoints.loginPath(), values);
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
        onSubmit={onSubmit}
      >
        {({ errors, touched }) => (
          <Form className={classnames(style.form__wrapper)}>
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
              className={classnames(
                style.form__submit,
                'btn',
                'btn-primary',
                'mb-2',
              )}
              type='submit'
            >
              {t('login.formSubmit')}
            </button>
          </Form>
        )}
      </Formik>
      <Navbar
        className={classnames(
          style.redirect__wrapper,
          'card-footer',
          'justify-content-center',
        )}
      >
        <Navbar.Collapse className='justify-content-center'>
          <Navbar.Text>
            {t('login.redirect.text')}
            <a href='/signup'>{t('login.redirect.submit')}</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};
