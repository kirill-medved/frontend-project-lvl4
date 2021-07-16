import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { Col, Row } from 'react-bootstrap';

import TokenContext from '../../context.js';
import {
  filterChannelMessages,
  sendMessage,
  setMessages,
} from '../../store/messagesSlice.js';
import {
  addNewChannel,
  filterChannelUsers,
  renameChannel,
  setChannels,
  setCurrentChannelId,
} from '../../store/channelsSlice.js';
import Channels from './Channels/Channels.jsx';
import style from './Main.module.scss';
import Chat from './Chat/index.jsx';

export default () => {
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

  useEffect(async () => {
    const res = await instance.get(`data`);

    dispatch(setMessages(res.data.messages));
    dispatch(setChannels(res.data.channels));
    dispatch(setCurrentChannelId(res.data.currentChannelId));
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
      // dispatch(setCurrentChannelId(newChannel.id));
    });

    socket.on('removeChannel', ({ id }) => {
      console.log(`remove id: ${id}`);
      dispatch(filterChannelMessages(id));
      dispatch(filterChannelUsers(id));
      dispatch(setCurrentChannelId(1));
    });

    socket.on('renameChannel', (channel) => {
      dispatch(renameChannel(channel));
    });
    return () => {
      // if component unmount connection will be destroyed
      socket.disconnect();
    };
  }, [socket, dispatch]);

  return (
    <Row>
      <Col md={3}>
        <Channels
          channels={channels}
          currentChannelId={currentChannelId}
          username={username}
        />
      </Col>
      <Col md='auto'>
        <Chat
          messages={messages}
          currentChannelId={currentChannelId}
          username={username}
        />
      </Col>
    </Row>
  );
};
