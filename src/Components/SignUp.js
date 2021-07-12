import React, { useContext } from 'react';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import TokenContext from '../context.js';

export default (props) => {
  const history = useHistory();
  const location = useLocation();
  const auth = useContext(TokenContext);

  const [t, i18n] = useTranslation();

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
      .max(20, t('signup.username.max')),
    password: yup
      .string()
      .min(6, t('signup.password.min'))
      .required(t('signup.password.required')),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], t('signup.confirmPassword.error')),
  });

  const submitHandler = async (
    values,
    { props, resetForm, setErrors, setSubmitting },
  ) => {
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
    <div>
      <Formik
        initialValues={{
          username: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={validationSchema}
        onSubmit={submitHandler}
      >
        {({ errors, touched }) => (
          <Form>
            <h1>{t('signup.title')}</h1>
            <div class='form-group row'>
              <label for='username'>{t('signup.username.text')}</label>
              <Field name='username' />
            </div>
            {/* If this field has been touched, and it contains an error, display it
             */}
            {touched.username && errors.username && (
              <div style={{ color: 'red' }}>{errors.username}</div>
            )}
            <div class='form-group row'>
              <label for='password'>{t('signup.password.text')}</label>
              <Field name='password' type='password' placeholder='Password' />
            </div>
            {/* If this field has been touched, and it contains an error, display
           it */}
            {touched.password && errors.password && (
              <div style={{ color: 'red' }}>{errors.password}</div>
            )}
            <div class='form-group row'>
              <label for='confirmPassword'>
                {t('signup.confirmPassword.text')}
              </label>
              <Field
                name='confirmPassword'
                type='password'
                placeholder='Confirm password'
              />
            </div>
            {/* If this field has been touched, and it contains an error, display
           it */}
            {touched.confirmPassword && errors.confirmPassword && (
              <div style={{ color: 'red' }}>{errors.confirmPassword}</div>
            )}

            <button className='btn btn-primary mb-2' type='submit'>
              {t('signup.formSubmit')}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
