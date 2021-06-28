import React, { useContext } from 'react';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';
import TokenContext from '../context.js';

const validationSchema = yup.object({
  username: yup.string().required('Email is required'),
  password: yup
    .string()
    .min(4, 'Password should be of minimum 4 characters length')
    .required('Password is required'),
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

  const submitHandler = async (values) => {
    // same shape as initial values
    try {
      console.log(values);
      const { data } = await axios.post('/api/v1/login', values);
      console.log(data);
      localStorage.setItem('token', data.token);
      login();
    } catch (error) {
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
        }}
        validationSchema={validationSchema}
        onSubmit={submitHandler}
      >
        {({ errors, touched }) => (
          <Form>
            <div class='form-group row'>
              <label for='exampleInputEmail1'>Input username:</label>
              <Field name='username' />
            </div>
            {/* If this field has been touched, and it contains an error, display it
             */}
            {touched.username && errors.username && (
              <div style={{ color: 'red' }}>{errors.username}</div>
            )}
            <div class='form-group row'>
              <label for='exampleInputEmail1'>Input password:</label>
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
    </div>
  );
};
