import React, { useRef, useState } from 'react';
import { EmojiMedia } from '../../../../../../../components';

const Form = ({ formHandler, sendMessageMode }) => {
  const [message, setMessage] = useState('');

  const submitBtRef = useRef(null);

  const onSubmit = (e) => {
    e.preventDefault();
    if (message.length > 0) {
      formHandler(message.trim());
      setMessage('');
    }
  };

  const onKeyDown = (e) => {
    const mapping = {
      standart: () => {
        if (e.code === 'Enter' && e.ctrlKey) {
          submitBtRef.current.click();
        }
      },
      alternative: () => {
        if (e.code === 'Enter' && e.ctrlKey) {
          setMessage(`${message}\n`);
        }
      },
    };

    mapping[sendMessageMode]();
  };

  const onChange = (e) => {
    // Return if user presses the enter key
    if (sendMessageMode === 'alternative') {
      if (e.nativeEvent.inputType === 'insertLineBreak') {
        submitBtRef.current.click();
        return;
      }
    }
    setMessage(e.target.value);
  };

  const addEmoji = ({ colons }) => {
    setMessage(`${message} ${colons}`.trim());
  };

  const onSelect = (emojiTag) => addEmoji(emojiTag);

  return (
    <div className='mt-auto px-5 py-3'>
      <form className='py-1 px-1 border rounded-2'>
        <div className='input-group has-validation'>
          <textarea
            value={message}
            data-testid='new-message'
            onChange={onChange}
            className='border-0 pt-1 form-control'
            placeholder='Введите сообщение...'
            onKeyDown={onKeyDown}
          />
          <div className='input-group-append'>
            <EmojiMedia onSelect={onSelect} />
            <button
              type='submit'
              onClick={onSubmit}
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
