import React from 'react';
import { io } from 'socket.io-client';

import Messages from './Messages.jsx';
import Form from './Form.jsx';

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
    <>
      <Messages messages={newMessages} />
      <Form onSubmit={onSubmit} />
    </>
  );
};
