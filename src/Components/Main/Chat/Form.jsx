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
    <div className='mt-auto px-5 py-3'>
      <form>
        <input
          value={message}
          data-testid='new-message'
          onChange={inputHandler}
        />
        <button type='submit' onClick={formHandler}>
          submit
        </button>
      </form>
    </div>
  );
};

export default Form;
