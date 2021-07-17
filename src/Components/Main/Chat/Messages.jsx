import React from 'react';
import classNames from 'classnames/bind.js';
import { Container } from 'react-bootstrap';

import style from './Messages.module.scss';

const Messages = ({ messages, username }) => {
  const cx = classNames.bind(style);

  return (
    <div
      className={cx({
        wrapper__channel: true,
        'w-100': true,
        'overflow-auto': true,
      })}
    >
      {messages.length > 0 &&
        messages.map((message) => {
          return (
            <Container
              key={message.id}
              className={cx({
                'd-flex': true,
                'justify-content-end': message.username === username,
                'justify-content-start': !(message.username === username),
              })}
            >
              <div
                className={cx({
                  wrapper: true,
                  myMessage: message.username === username,
                  notMyMessage: !(message.username === username),
                })}
              >
                <div className='d-flex justify-content-around'>
                  <div>{message.username}</div>
                  <div>{message.date.slice(11, -5)} </div>
                </div>
                <div>
                  <p className={cx({ message: true })}>{message.message}</p>
                </div>
              </div>
            </Container>
          );
        })}
    </div>
  );
};

export default Messages;
