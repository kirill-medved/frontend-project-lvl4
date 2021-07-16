import React from 'react';
import { io } from 'socket.io-client';

import Messages from './Messages.jsx';
import Form from './Form.jsx';
import style from './Chat.module.scss';

export default ({ username, currentChannelId, messages }) => {
  const socket = io();

  const onSubmit = (message) => {
    const date = new Date();
    const messageObj = {
      message,
      date,
      username,
      channelId: currentChannelId,
    };
    socket.emit('newMessage', messageObj);
  };

  const newMessages = messages.filter(
    (message) => message.channelId === currentChannelId,
  );
  return (
    <div className={style.wrapper}>
      <Messages messages={newMessages} />
      <Form onSubmit={onSubmit} />
    </div>
  );
};