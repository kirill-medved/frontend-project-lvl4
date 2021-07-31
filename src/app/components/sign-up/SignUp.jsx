import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames/bind.js';

import style from './SignUp.module.scss';
import { useAuth } from '../../../hooks';

export default () => {
  const history = useHistory();
  const location = useLocation();
  const auth = useAuth();

  const [t] = useTranslation();

  const cx = classNames.bind(style);

  const { from } = location.state || { from: { pathname: '/' } };
  const login = () => {
    auth.signin(() => {
      history.replace(from);
    });
  };

  const validationSchema = yup.object({
    username: yup
      .string()
      .required(t('signup.username.required'))
      .min(3, t('signup.username.min'))
      .max(20, t('signup.username.max'))
      .default(''),
    password: yup
      .string()
      .min(6, t('signup.password.min'))
      .required(t('signup.password.required'))
      .default(''),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], t('signup.confirmPassword.error'))
      .default(''),
  });

  const submitHandler = async (values, { setErrors }) => {
    // same shape as initial values
    try {
      const { data } = await axios.post('/api/v1/signup', values);
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.username);
      login();
    } catch (error) {
      if (error.message.endsWith('409')) {
        setErrors({ username: t('signup.username.notuniq') });
      }
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
            <h1>{t('signup.title')}</h1>

            <label htmlFor='username'>{t('signup.username.text')}</label>
            <Field name='username' />

            {/* If this field has been touched, and it contains an error, display it
             */}
            {touched.username && errors.username && (
              <div style={{ color: 'red' }}>{errors.username}</div>
            )}

            <label htmlFor='password'>{t('signup.password.text')}</label>
            <Field name='password' type='password' placeholder='Password' />

            {/* If this field has been touched, and it contains an error, display
           it */}
            {touched.password && errors.password && (
              <div style={{ color: 'red' }}>{errors.password}</div>
            )}

            <label htmlFor='confirmPassword'>
              {t('signup.confirmPassword.text')}
            </label>
            <Field
              name='confirmPassword'
              type='password'
              placeholder='Confirm password'
            />

            {/* If this field has been touched, and it contains an error, display
           it */}
            {touched.confirmPassword && errors.confirmPassword && (
              <div style={{ color: 'red' }}>{errors.confirmPassword}</div>
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
              {t('signup.formSubmit')}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
