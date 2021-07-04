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
    socket.emit('newMessage', message, ({ status }) => {
      status === 'ok' ? console.log('OK') : console.log('False');
    });
    socket.on('newMessage', (newMessage) => {
      dispatch(sendMessage(newMessage));
    });
  };

  useEffect(() => {
    socket.on('connect', () => {
      console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    });

    socket.on('newMessage', (newMessage) => {
      dispatch(sendMessage(newMessage));
    });
    return () => {
      socket.disconnect();
    };
  }, [socket, dispatch]);
  return (
    <div className={style.wrapper}>
      <Messages messages={props.messages} />
      <Form onSubmit={onSubmit} />
    </div>
  );
};
