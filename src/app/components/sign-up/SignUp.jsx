import React from 'react';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import classnames from 'classnames';

import style from './SignUp.module.scss';
import { useAuth } from '../../../hooks';
import { TextInput } from '../../../components';

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

  const onSubmit = async (values, { setErrors }) => {
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
        onSubmit={onSubmit}
      >
        {({ errors, touched }) => (
          <Form className={classnames(style.form__wrapper)}>
            <h1>{t('signup.title')}</h1>

            <TextInput
              name='username'
              labelText={t('signup.username.text')}
              placeholder='Username'
            />
            {touched.username && errors.username && (
              <div className={style.error__wrapper}>{errors.username}</div>
            )}

            <TextInput
              name='password'
              type='password'
              placeholder='Password'
              labelText={t('signup.password.text')}
            />
            {touched.password && errors.password && (
              <div className={style.error__wrapper}>{errors.password}</div>
            )}

            <TextInput
              name='confirmPassword'
              type='password'
              placeholder='Confirm password'
              labelText={t('signup.confirmPassword.text')}
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <div className={style.error__wrapper}>
                {errors.confirmPassword}
              </div>
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
              {t('signup.formSubmit')}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
