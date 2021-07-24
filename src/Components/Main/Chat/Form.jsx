import React, { useRef, useState } from 'react';

const Form = ({ onSubmit }) => {
  const [message, setMessage] = useState('');

  const submitBtRef = useRef(null);

  const formHandler = (e) => {
    e.preventDefault();
    if (message.length > 0) {
      onSubmit(message.trim());
      setMessage('');
    }
  };

  const inputHandler = (e) => {
    console.log({ e }); // Destructure to get a more accurate log

    // Return if user presses the enter key
    // if (e.nativeEvent.inputType === 'insertLineBreak') return;

    if (e.code === 'Enter' && e.shiftKey) {
      console.log('IIIIIIIIII');
      setMessage(`${message}\n`);
      return;
    }
    if (e.code === 'Enter') {
      submitBtRef.current.click();
      return;
    }
    setMessage(e.target.value);

    // setMessage(e.target.value);
  };

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
          />
          <div className='input-group-append'>
            <button
              type='submit'
              onClick={formHandler}
              className='btn btn-outline-secondary'
              ref={submitBtRef}
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
