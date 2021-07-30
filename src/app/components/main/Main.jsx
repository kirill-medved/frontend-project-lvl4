import React, { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { Col, Row } from 'react-bootstrap';
import * as _ from 'lodash';

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
  setCurrentChannelName,
} from '../../store/channelsSlice.js';
import { Channels, Chat } from './components';

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

  // to scroll messages to bottom
  const messagesContainerRef = useRef(null);

  const [sendMessageMode, setSendMessageMode] = useState('standart');

  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels.channels);
  const messages = useSelector((state) => state.messages.messages);
  const currentChannelId = useSelector(
    (state) => state.channels.currentChannelId,
  );

  useEffect(async () => {
    const res = await instance.get(`data`);

    const currentChannel = _.find(
      res.data.channels,
      (channel) => channel.id === res.data.currentChannelId,
    );

    dispatch(setMessages(res.data.messages));
    dispatch(setChannels(res.data.channels));
    dispatch(setCurrentChannelId(res.data.currentChannelId));

    dispatch(setCurrentChannelName(currentChannel.name)); // with this server
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
      const scrollToBotton = () => {
        messagesContainerRef.current.scrollTop =
          messagesContainerRef.current.scrollHeight;
      };
      // make scrooll to last send message for all users
      scrollToBotton();
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
    <Row className='row h-100 bg-white flex-md-row'>
      <Col md={3} className='border-end pt-5 px-0 bg-light'>
        <Channels
          channels={channels}
          currentChannelId={currentChannelId}
          username={username}
          messages={messages}
          setSendMessageMode={setSendMessageMode}
        />
      </Col>
      <Col md={9} className='p-0 h-100'>
        <Chat
          messages={messages}
          currentChannelId={currentChannelId}
          username={username}
          messagesContainerRef={messagesContainerRef}
          sendMessageMode={sendMessageMode}
        />
      </Col>
    </Row>
  );
};
