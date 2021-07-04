import React from 'react';
import Login from '../../Login';
import style from './Messages.module.sass';

const Messages = (props) => {
  return (
    <div>
      {props.messages.length > 0 &&
        props.messages.map((message) => {
          console.log(message.date);
          console.log(typeof message.date);
          console.log(message.date.getMinutes());
          return (
            <div key={message.id} className={style.wrapper}>
              <div>
                <h4>{message.username}</h4>
                <h5>
                  {message.date.getHours()}:{message.date.getMinutes()}
                </h5>
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
