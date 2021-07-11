import React, { useContext } from 'react';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';
import TokenContext from '../context.js';

const validationSchema = yup.object({
  username: yup
    .string()
    .required('Username is required')
    .min(3, 'длина от 3 до 20 символов')
    .max(20, 'длина от 3 до 20 символов'),
  password: yup
    .string()
    .min(6, 'Password should be of minimum 6 characters length')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

export default (props) => {
  const history = useHistory();
  const location = useLocation();
  const auth = useContext(TokenContext);

  const { from } = location.state || { from: { pathname: '/' } };
  const login = () => {
    auth.signin(() => {
      history.replace(from);
    });
  };

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
        setErrors({ username: 'This is a dummy procedure error' });
      }
      console.log(error.message);
      console.log(error);
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
            <div class='form-group row'>
              <label for='username'>Input username:</label>
              <Field name='username' />
            </div>
            {/* If this field has been touched, and it contains an error, display it
             */}
            {touched.username && errors.username && (
              <div style={{ color: 'red' }}>{errors.username}</div>
            )}
            <div class='form-group row'>
              <label for='password'>Input password:</label>
              <Field name='password' type='password' placeholder='Password' />
            </div>
            {/* If this field has been touched, and it contains an error, display
           it */}
            {touched.password && errors.password && (
              <div style={{ color: 'red' }}>{errors.password}</div>
            )}
            <div class='form-group row'>
              <label for='confirmPassword'>Confirm password:</label>
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
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
