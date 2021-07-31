import React from 'react';
import { Field } from 'formik';

const TextInput = ({
  name = '',
  type = '',
  placeholder = '',
  labelText = '',
}) => {
  return (
    <div>
      {labelText.length > 0 && <label htmlFor={name}>{labelText}</label>}
      <Field name={name} type={type} placeholder={placeholder} />
    </div>
  );
};

export default TextInput;
