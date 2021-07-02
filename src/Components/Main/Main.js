import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';

import TokenContext from '../../context.js';
import { setMessages } from '../../store/messagesSlice.js';
import { setChannels } from '../../store/channelsSlice.js';
import Channels from './Channels.js';
import Messages from './Messages.js';
import style from './Main.module.sass';

export default (props) => {
  const socket = io();

  socket.on('connect', () => {
    console.log(socket.id); // x8WIv7-mJelg7on_ALbx
  });

  socket.on('disconnect', () => {
    console.log(socket.id); // undefined
  });

  const acknowledge = ({ status }) => {
    console.log(`status message ${status}`);
  };

  const auth = useContext(TokenContext);
  const instance = axios.create({
    baseURL: '/api/v1/',
    headers: {
      Authorization: `Bearer ${auth.user}`,
    },
  });

  const [message, setMessage] = useState('');

  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels.channels);
  const messages = useSelector((state) => state.messages.messages);
  console.log(channels);
  console.log(messages);

  const inputHandler = (e) => {
    setMessage(e.target.value);
  };

  const formHandler = (e) => {
    e.preventDefault();
    socket.emit('newMessage', message, acknowledge);
  };
  useEffect(async () => {
    const res = await instance.get(`data`);

    dispatch(setMessages(res.data.messages));
    dispatch(setChannels(res.data.channels));
    console.log(res);
  }, [dispatch]);

  return (
    <div className={style.wrapper}>
      <Channels channels={channels} />
      <div className={style.border}>
        <Messages messages={messages} />
        <form>
          <input value={message} onChange={inputHandler} />
          <button type='submit' onClick={formHandler}>
            submit
          </button>
        </form>
      </div>
    </div>
  );
};
