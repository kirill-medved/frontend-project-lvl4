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
    const messageObj = {
      message: message,
      date: new Date(),
      username: props.username,
      channelId: props.currentChannelId,
    };
    socket.emit('newMessage', messageObj, ({ status }) => {
      status === 'ok' ? console.log('OK') : console.log('False');
    });
  };

  useEffect(() => {
    socket.on('connect', () => {
      console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    });
    // listen for new messages
    socket.on('newMessage', (newMessage) => {
      dispatch(sendMessage(newMessage));
    });
    return () => {
      //if component unmount connection will be destroyed
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
