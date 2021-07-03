import React from 'react';
import Messages from './Messages.js';
import Form from './Form.js';
import style from './Chat.module.scss';

export default (props) => {
  return (
    <div className={style.wrapper}>
      <Messages messages={props.messages} />
      <Form />
    </div>
  );
};
