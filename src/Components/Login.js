import React from 'react';
import { useFormik, Formik, Form, Field } from 'formik';
import * as yup from 'yup';

export default (props) => {
  const validationSchema = yup.object({
    username: yup.string().required('Email is required'),
    password: yup
      .string()
      .min(8, 'Password should be of minimum 8 characters length')
      .required('Password is required'),
  });

  return (
    <div>
      <Formik
        initialValues={{
          username: '',
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          // same shape as initial values
          console.log(values);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Field name='username' />
            {/* If this field has been touched, and it contains an error, display it
             */}
            {touched.username && errors.username && (
              <div>{errors.username}</div>
            )}
            <Field name='password' />
            {/* If this field has been touched, and it contains an error, display
           it */}
            {touched.password && errors.password && (
              <div>{errors.password}</div>
            )}
            <button type='submit'>Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
