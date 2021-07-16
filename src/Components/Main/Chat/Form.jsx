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
      <form className='py-1 border rounded-2'>
        <div className='input-group has-validation'>
          <input
            value={message}
            data-testid='new-message'
            onChange={inputHandler}
            className='border-0 p-0 ps-2 form-control'
            placeholder='Введите сообщение...'
          />
          <div className='input-group-append'>
            <button
              type='submit'
              onClick={formHandler}
              className='btn btn-outline-secondary'
            >
              <img
                src='https://img.icons8.com/material-outlined/24/000000/sent.png'
                alt='Отправить'
              />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
