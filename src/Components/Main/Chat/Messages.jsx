import React from 'react';

import style from './Messages.module.sass';

const Messages = ({ messages }) => {
  return (
    <div>
      {messages.length > 0 &&
        messages.map((message) => {
          return (
            <div key={message.id} className={style.wrapper}>
              <div>
                <h4>{message.username}</h4>
                <h5>{message.date.slice(11, -5)} </h5>
              </div>
              <div>
                <p>{message.message}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Messages;
