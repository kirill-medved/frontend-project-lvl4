import React from 'react';
import classnames from 'classnames';
import { Container } from 'react-bootstrap';
import { Emoji } from 'emoji-mart';
import reactStringReplace from 'react-string-replace';

import style from './Message.module.scss';

const Message = ({ message, username }) => {
  return (
    <Container
      className={classnames(
        'd-flex',
        { 'justify-content-end': message.username === username },
        { 'justify-content-start': !(message.username === username) },
      )}
    >
      <div
        className={classnames(
          style.wrapper,
          { [style.myMessage]: message.username === username },
          { [style.notMyMessage]: !(message.username === username) },
        )}
      >
        <div className='d-flex justify-content-around'>
          <div>{message.username}</div>
          <div>{message.date.slice(11, -8)} </div>
        </div>
        <div>
          {message.message.split('\n').map((text) => (
            <p className={classnames(style.message)}>
              {reactStringReplace(text, /:(.+?):/g, (match, i) => (
                <Emoji key={i} emoji={match} set='apple' size={16} />
              ))}
            </p>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Message;
