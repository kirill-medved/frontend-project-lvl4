import React, { useRef, useState } from 'react';

const Form = ({ onSubmit, sendMessageMode }) => {
  const [message, setMessage] = useState('');

  const submitBtRef = useRef(null);

  const formHandler = (e) => {
    e.preventDefault();
    if (message.length > 0) {
      onSubmit(message.trim());
      setMessage('');
    }
  };

  const onKeyDown = (e) => {
    const mapping = {
      standart: () => {
        if (e.code === 'Enter' && e.ctrlKey) {
          console.log('standart');
          submitBtRef.current.click();
        }
      },
      alternative: () => {
        if (e.code === 'Enter' && e.shftKey) {
          console.log('alternative');
          setMessage(`${message}\n`);
        }
      },
    };

    mapping[sendMessageMode]();
  };

  const inputHandler = (e) => {
    console.log(e); // Destructure to get a more accurate log

    // Return if user presses the enter key
    if (sendMessageMode === 'alternative') {
      if (e.nativeEvent.inputType === 'insertLineBreak') {
        submitBtRef.current.click();
      }
    } else {
      setMessage(e.target.value);
    }

    // if (e.code === 'Enter') {

    //   return;
    // }
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
            onKeyDown={onKeyDown}
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
