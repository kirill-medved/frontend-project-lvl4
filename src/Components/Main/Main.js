import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';

import TokenContext from '../../context.js';
import { sendMessage, setMessages } from '../../store/messagesSlice.js';
import { setChannels } from '../../store/channelsSlice.js';
import Channels from './Channels/Channels.js';
import style from './Main.module.scss';
import Chat from './Chat/index.js';

export default (props) => {
  const socket = io();

  socket.on('connect', () => {
    console.log(socket.id); // x8WIv7-mJelg7on_ALbx
  });
  socket.on('disconnect', () => {
    console.log(socket.id); // undefined
  });

  const auth = useContext(TokenContext);
  const instance = axios.create({
    baseURL: '/api/v1/',
    headers: {
      Authorization: `Bearer ${auth.user}`,
    },
  });

  const acknowledge = ({ status }) => {
    console.log(`status message ${status}`);
  };

  socket.emit('newMessage', message, acknowledge);
  dispatch(sendMessage());

  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels.channels);
  const messages = useSelector((state) => state.messages.messages);
  console.log(channels);
  console.log(messages);

  // useEffect(() => {
  //   return () => {};
  // }, []);

  useEffect(async () => {
    const res = await instance.get(`data`);

    dispatch(setMessages(res.data.messages));
    dispatch(setChannels(res.data.channels));
    console.log(res);

    return;
  }, [dispatch]);

  return (
    <div className={style.wrapper}>
      <Channels channels={channels} />
      <Chat />
    </div>
  );
};
