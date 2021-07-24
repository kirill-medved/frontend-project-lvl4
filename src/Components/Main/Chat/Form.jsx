import React, { useState } from 'react';

const Form = (props) => {
  const [message, setMessage] = useState('');

  const inputHandler = (e) => {
    console.log(e);

    setMessage(e.target.value);
  };

  const formHandler = (e) => {
    e.preventDefault();
    if (message.length) {
      props.onSubmit(message);
      setMessage('');
    }
  };
  console.log(message);
  return (
    <div className='mt-auto px-5 py-3'>
      <form className='py-1 px-1 border rounded-2'>
        <div className='input-group has-validation'>
          <input
            value={message}
            data-testid='new-message'
            onChange={inputHandler}
            className='border-0 pt-1 form-control'
            placeholder='Введите сообщение...'
            onKeyDown={(e) => {
              if (e.code === 'Enter' && e.ctrlKey) {
                console.log('РАБОТАЕТ');
                setMessage((m) => `${m}\n`);
              }
              if (e.shiftKey && e.code === 'Enter') {
                setMessage((m) => `${m}\n`);
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
