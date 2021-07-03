import React from 'react';
import style from './Messages.module.sass';

const Messages = (props) => {
  return (
    <div>
      {props.messages.length > 0 &&
        props.messages.map((message) => {
          return (
            <div key={message.id} className={style.wrapper}>
              <p>
                {Object.entries(message).reduce((acc, [key, value]) => {
                  if (key === 'id') return acc;
                  return acc + value;
                }, '')}
              </p>
            </div>
          );
        })}
    </div>
  );
};

export default Messages;
