import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import TokenContext from '../../context.js';
import { setMessages } from '../../store/messagesSlice.js';
import { setChannels, setCurrentChannelId } from '../../store/channelsSlice.js';
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
