import React, { useEffect } from 'react';
import { io } from 'socket.io-client';

import Messages from './Messages.js';
import Form from './Form.js';
import style from './Chat.module.scss';
import { useDispatch } from 'react-redux';
import { sendMessage } from '../../../store/messagesSlice.js';

export default (props) => {
  const socket = io();

  const dispatch = useDispatch();

  const onSubmit = (message) => {
    const date = new Date();
    const messageObj = {
      message: message,
      date: date,
      username: props.username,
      channelId: props.currentChannelId,
    };
    socket.emit('newMessage', messageObj, ({ status }) => {
      status === 'ok' ? console.log('OK') : console.log('False');
    });
  };

  const messages = props.messages.filter(
    (message) => message.channelId === props.currentChannelId,
  );
  return (
    <div className={style.wrapper}>
      <Messages messages={messages} />
      <Form onSubmit={onSubmit} />
    </div>
  );
};
