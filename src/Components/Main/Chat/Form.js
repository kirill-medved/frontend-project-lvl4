import React, { useState } from 'react';

const Form = (props) => {
  const [message, setMessage] = useState('');

  const inputHandler = (e) => {
    setMessage(e.target.value);
  };

  const formHandler = (e) => {
    e.preventDefault();
    props.onSubmit(message);
    setMessage('');
  };

  return (
    <>
      <form>
        <input value={message} onChange={inputHandler} />
        <button type='submit' onClick={formHandler}>
          submit
        </button>
      </form>
    </>
  );
};

export default Form;
