import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';

import TokenContext from '../../context.js';
import {
  filterChannelMessages,
  sendMessage,
  setMessages,
} from '../../store/messagesSlice.js';
import {
  addNewChannel,
  setChannels,
  setCurrentChannelId,
} from '../../store/channelsSlice.js';
import Channels from './Channels/Channels.js';
import style from './Main.module.scss';
import Chat from './Chat/index.js';

export default (props) => {
  const auth = useContext(TokenContext);
  const instance = axios.create({
    baseURL: '/api/v1/',
    headers: {
      Authorization: `Bearer ${auth.user}`,
    },
  });

  const socket = io();

  const username = localStorage.getItem('username');

  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels.channels);
  const messages = useSelector((state) => state.messages.messages);
  const currentChannelId = useSelector(
    (state) => state.channels.currentChannelId,
  );
  console.log(channels);
  console.log(messages);
  console.log(currentChannelId);

  useEffect(async () => {
    const res = await instance.get(`data`);

    dispatch(setMessages(res.data.messages));
    dispatch(setChannels(res.data.channels));
    dispatch(setCurrentChannelId(res.data.currentChannelId));
    console.log(res);

    return;
  }, [dispatch]);

  // до того как вынес сокет вверх
  // при создании нового канала происходило миллион
  // re-render и один канал отрисовывался много раз
  useEffect(() => {
    socket.on('connect', () => {
      console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    });

    socket.on('newMessage', (newMessage) => {
      dispatch(sendMessage(newMessage));
    });

    socket.on('newChannel', (newChannel) => {
      dispatch(addNewChannel(newChannel));
      //dispatch(setCurrentChannelId(newChannel.id));
    });

    socket.on('removeChannel', ({ id }) => {
      console.log(`remove id: ${id}`);
      dispatch(filterChannelMessages(id));
      dispatch(setCurrentChannelId(1));
    });
    return () => {
      //if component unmount connection will be destroyed
      socket.disconnect();
    };
  }, [socket, dispatch]);

  return (
    <div className={style.wrapper}>
      <Channels
        channels={channels}
        currentChannelId={currentChannelId}
        username={username}
      />
      <Chat
        messages={messages}
        currentChannelId={currentChannelId}
        username={username}
      />
    </div>
  );
};
