import React from 'react';
import style from './Messages.module.sass';

const Messages = (props) => {
  return (
    <div>
      {props.messages.length &&
        props.messages.map((message) => {
          return (
            <div key={message.id} className={style.wrapper}>
              <p>{message.name}</p>
            </div>
          );
        })}
    </div>
  );
};

export default Messages;
