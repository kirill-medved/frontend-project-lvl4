import React, { useState } from 'react';

const Form = ({ onSubmit }) => {
  const [message, setMessage] = useState('');

  const inputHandler = (e) => {
    setMessage(e.target.value);
  };

  const formHandler = (e) => {
    e.preventDefault();
    if (message.length > 0) {
      onSubmit(message.trim());
      setMessage('');
    }
  };
  console.log(message);
  return (
    <div className='mt-auto px-5 py-3'>
      <form className='py-1 px-1 border rounded-2'>
        <div className='input-group has-validation'>
          <textarea
            value={message}
            data-testid='new-message'
            onChange={inputHandler}
            className='border-0 pt-1 form-control'
            placeholder='Введите сообщение...'
            onKeyDown={(e) => {
              if (e.code === 'Enter' && e.shiftKey) {
                console.log('IIIIIIIIII');
                setMessage(`${message}\n`);
              }
              if (e.code === 'Enter') {
                formHandler();
              }
            }}
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
