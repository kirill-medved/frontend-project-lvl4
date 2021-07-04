import React from 'react';

import style from './Messages.module.sass';

const Messages = (props) => {
  return (
    <div>
      {props.messages.length > 0 &&
        props.messages.map((message) => {
          console.log(message);
          console.log(typeof message.date);
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
