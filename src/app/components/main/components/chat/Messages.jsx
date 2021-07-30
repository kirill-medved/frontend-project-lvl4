import React from 'react';
import classNames from 'classnames/bind.js';
import { Container } from 'react-bootstrap';
import { Emoji } from 'emoji-mart';
import reactStringReplace from 'react-string-replace';

import style from './Messages.module.scss';

const Messages = ({ messages, username, containerRef }) => {
  const cx = classNames.bind(style);

  return (
    <div
      className={cx({
        wrapper__channel: true,
        'w-100': true,
        'overflow-auto': true,
      })}
      ref={containerRef}
    >
      {messages.length > 0 ? (
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
                  <div>{message.date.slice(11, -8)} </div>
                </div>
                <div>
                  {message.message.split('\n').map((text) => (
                    <p className={cx({ message: true })}>
                      {reactStringReplace(text, /:(.+?):/g, (match, i) => (
                        <Emoji key={i} emoji={match} set='apple' size={16} />
                      ))}
                    </p>
                  ))}
                </div>
              </div>
            </Container>
          );
        })
      ) : (
        <p style={{ textAlign: 'center' }}>
          Чат пока что пуст. Напишите первое сообщение!
        </p>
      )}
    </div>
  );
};

export default Messages;
